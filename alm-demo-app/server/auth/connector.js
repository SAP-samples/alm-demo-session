"use strict";

// const request = require("request");
const fetch = import('node-fetch')
const { Buffer } = require('buffer');
const xsenv = require("@sap/xsenv");

//Request Counter for load testing
const cacheProvider = require("./cache-provider");
const AxiosConnectionPool = require("./connectionPool");
const landscapeConfigs = require("./landscapeConfig");
// const { v4: uuidv4 } = require('uuid');

const NonRetriableList = [400, 404, 405, 413]

const FAILED_MESSAGE_TO_TARGET_ROUTER = "Failed to process the message to the target router";
class Connector {
    /***
     * Extract client id, client secret and url from the bound Destinations service VCAP_SERVICES object
     *
     * when the promise resolves it returns a clientid, clientsecret and url of the token granting service
     *
     * @returns {Promise<any>}
     */
    static getCredentials() {
        return new Promise(function (resolve) {
            const destination = xsenv.getServices({
                destination: {
                    tag: "destination",
                },
            }).destination;
            const credentials = {
                clientid: destination.clientid,
                clientsecret: destination.clientsecret,
                url: destination.url,
            };

            resolve(credentials);
            return;
        });
    }

    /***
     * This creates a token for us from the supplied token granting service url, the clientid and the client
     * secret when the promise resolves
     *
     * The return value when the promise resolves is an object and not a string. The request API will turn the response
     * from a string into an object for us.
     *
     * @param destAuthUrl : url of the destination service token granting service - you will still need to append /oath/token to the url
     * @param clientId: the clientId used to get a token from the
     * @param clientSecret : the password to get a token
     * @returns {Promise<any>}
     */
    static createToken(destAuthUrl, clientId, clientSecret) {
        return new Promise(function (resolve, reject) {
            // we make a post using x-www-form-urlencoded encoding for the body and for the authorization we use the
            // clientid and clientsecret.
            // Note we specify a grant_type and client_id as required to get the token
            // the request will return a JSON object already parsed
            fetch(`${destAuthUrl}/oauth/token`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                        'Content-Type': 'application/json'
                    },
                    body: `grant_type=client_credentials&client_id=${clientid}`
                },
                function (error, response, body) {
                    if (error) {
                        console.log(`Connector: Failed to retrieve the token for the destination `)
                        return reject(error);
                    } else {
                        // console.log('RESPONSE STATUS : ', response.statusCode, response.status)
                        resolve(body);
                    }
                }
            );
        });
    }

    /***
     * This gets the destination using the supplied access token. We generated the access token using
     * createToken above.
     *
     * The destination has the uri field that holds the server(url) that will enable us to get the
     * destination details.
     *
     * As above we do a GET request but instead of authentication we supply a bearer and access token
     * which give us access to the destination service for our service.
     *
     * The return value when the promise resolves is an object and not a string. The request API will turn the response
     * from a string into an object for us.
     *
     * @param access_token : the access token giving us access to the destination service
     * @param destinationName : the name of the destination to retrieve.
     * @returns {Promise<any>}
     */
    static getDestination(access_token, destinationName) {
        return new Promise(async function (resolve, reject) {
            const destination = xsenv.getServices({
                destination: { tag: "destination" },
            }).destination;
            // Note that we use the uri and not the url!!!!
            // console.log(access_token)
            // console.log(`${destination.uri}/destination-configuration/v1/destinations/${destinationName}`)
            fetch(`${destination.uri}/destination-configuration/v1/destinations/${destinationName}`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token.access_token}`,
                        'Content-Type': 'application/json'
                    }
                },
                function (error, response, body) {
                    if (error) {
                        // console.log('Error in getting auth token : ', error.toString())
                        console.log(`Connector : error retrieving destination ${error.toString()}`);
                        reject(error);
                    } else {
                        // console.log('Successfully called Destination service : ', response.status)
                        // console.log('RESPONSE : ', response.status)
                        resolve({
                            message: "Successfully called Destination service.",
                            destinationInfo: body,
                        });
                    }
                }
            );
        });
    }

    static getDcDestination(app_datacenter_id) {
        return new Promise(function (resolve, reject) {
            this
                .getCredentials()
                .then(async function (credentials) {
                    let token_body = cacheProvider
                        .instance()
                        .get(credentials.clientid);
                    // console.log('TOKEN : ', token_body)
                    if (token_body == undefined) {
                        // console.log('CREATING TOKEN')
                        token_body = await this.createToken(
                            credentials.url,
                            credentials.clientid,
                            credentials.clientsecret
                        );
                        cacheProvider
                            .instance()
                            .set(
                                credentials.clientid,
                                token_body,
                                (Math.floor(token_body.expires_in / 60) - 10)
                            );
                    }
                    return token_body;
                })
                .then(async function (token_body) {
                    // console.log('TRYING TO GET DESTINATION FROM CACHE')
                    let destination = cacheProvider.instance().get(app_datacenter_id);
                    if (destination == undefined) {
                        // console.log('DESTINATION REGENERATING')
                        try {
                            destination = await this.getDestination(
                                token_body.access_token,
                                app_datacenter_id
                            );
                        } catch (error) {
                            console.log(`Connector: Failed to get the destination service for target : ${app_datacenter_id}`)
                            reject(error);
                        }

                        cacheProvider
                            .instance()
                            .set(
                                app_datacenter_id,
                                destination,
                                (Math.floor(token_body.expires_in / 60) - 10)
                            );
                    }
                    return resolve(destination);
                })
                .catch(function (error) {
                    console.log(`Connector: Failed to get the destination service for target : ${app_datacenter_id}`)
                    reject(error);
                });
        });
    }

    /**
     *
     * @param {String} landscape
     * @param {String} datacenter
     * @returns String
     */
    static frameTargetUrl(landscape, datacenter) {

        let url = ''
        if (landscape === 'prod') {
            url = process.env.DRI_PROD_URL.replace('<datacenter>', datacenter)
        } else {
            url = process.env.DRI_NON_PROD_URL.replace('<datacenter>', datacenter).replace('<landscape>', landscape)
        }
        return url

    }

    /**
     * 
     * @param {Object} dataReq 
     * @param {string} correlationId 
     * @returns 
     */
    static async processRouting(dataReq, correlationId) {
        return new Promise(async (resolve, reject) => {
            let targetDc
            try {
                const dataReqObj = {};
                dataReqObj.payload = dataReq.payload;

                const headers = dataReq.headers;
                // console.log(headers)
                const usecaseSpace = headers.usecaseSpace.toString();
                targetDc = headers.targetDc.toString();
                // correlationId = headers.correlationId ? headers.correlationId.toString() : uuidv4()

                // console.log("correlationId", correlationId)
                // console.log('targetDc value= ', targetDc)


                dataReq.headers = this.getDataReqObjectHeaders(correlationId, headers)
                dataReq.headers["X-CorrelationID"] = correlationId

                // dataReqObj.headers = {
                // 	targetDc: headers.targetDc.toString(),
                // 	message_id: headers.message_id.toString(),
                // 	schema: headers.schema.toString(),
                // 	usecaseSpace: headers.usecaseSpace.toString(),
                // 	usecaseName: headers.usecaseName.toString(),
                // 	msg_version: headers.msg_version.toString(),
                // 	version: headers.version.toString(),
                // 	action: headers.action.toString(),
                // }

                const landscape = landscapeConfigs.getLandscape(usecaseSpace);

                const { mappedLandscape, mappedDC } = landscapeConfigs.getPhysicalDCMAp(landscape, targetDc)

                const baseurl = this.frameTargetUrl(mappedLandscape, mappedDC)

                let url = ''

                if (dataReq.headers['isProviderConfig'] === 'true') {
                    console.log('Provider Config Message: ', { correlation_id: correlationId })
                    // url = `${destination.destinationInfo.destinationConfiguration.URL}` + "/provider" + "/" + landscape
                    url = `${baseurl}` + "/provider" + "/" + landscape
                } else if (headers.action.toString() === 'acknowledgement') {
                    console.log('Acknowledgement Message', { correlation_id: correlationId })
                    const version = headers.version.toString();
                    const action = headers.action.toString();

                    url = `${baseurl}` + "/api" + "/" + landscape + "/" + version + "/" + action
                } else if (headers.action.toString() === 'internal-configs-reload') {
                    console.log('Connector: Internal config Message', { correlation_id: correlationId })
                    url = `${baseurl}` + "/internal/configs/reload"
                } else {
                    console.log('Connector: Usecase Message', { correlation_id: correlationId })
                    const use_case = headers.usecaseName.toString();
                    console.log(`Connector: usecase ${use_case} `, { correlation_id: correlationId })
                    const action = headers.action.toString();
                    console.log(`Connector: action ${action} `, { correlation_id: correlationId })
                    const version = headers.version.toString();
                    console.log(`Connector: version ${version} `, { correlation_id: correlationId })


                    // url = `${destination.destinationInfo.destinationConfiguration.URL}` + "/api" + "/" + landscape + "/" + use_case + "/" + version + "/" + action
                    url = `${baseurl}` + "/api" + "/" + landscape + "/" + use_case + "/" + version + "/" + action
                }

                // console.log('Final url : ', url)
                // console.log(dataReqObj.payload, dataReqObj.headers)
                AxiosConnectionPool.getConnection(landscape + '-' + targetDc)
                    .post(
                        url,
                        dataReq.payload,
                        {
                            headers: dataReq.headers,
                        }
                    )
                    .then((result) => {
                        // console.log(result)
                        console.log("RESPONSE STATUS CODE ", result.status, { correlation_id: correlationId });
                        if (result.status === 200) {
                            resolve({
                                message: "Successfully processed the service call.",
                                target_center: targetDc,
                                status: "1",
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.log(`RESPONSE STATUS CODE  ${error.response.status}`, { correlation_id: correlationId });
                            log.error(`Connector: failed to process the message to the target router " + ${error.message}`);
                            if (NonRetriableList.includes(error.response.status)) {
                                console.log(`Non Retriable error`, { correlation_id: correlationId })
                                reject({
                                    message: FAILED_MESSAGE_TO_TARGET_ROUTER,
                                    target_center: targetDc,
                                    status: "-1",
                                })
                            } else {
                                console.log(`Retriable error`, { correlation_id: correlationId })
                                reject({
                                    message: FAILED_MESSAGE_TO_TARGET_ROUTER,
                                    target_center: targetDc,
                                    status: "0",
                                })
                            }
                        } else {
                            console.log(`Non Retriable error ${error.message}`, { correlation_id: correlationId })
                            reject({
                                message: FAILED_MESSAGE_TO_TARGET_ROUTER,
                                target_center: targetDc,
                                status: "-1",
                            })
                        }

                    });
                // })
                // .catch((error) => {
                // 	log.error("Connector: failed to process the message to the target router " + error + error.stack);
                // 	reject({
                // 		message:
                // 			"Failed to process the message to the target router",
                // 		target_center: targetDc,
                // 		status: "0",
                // 	})
                // });
            } catch (err) {
                console.log(`Non Retriable error`, { correlation_id: correlationId })
                console.log(`Connector: failed to process the message to the target router : ${err}`)
                reject({
                    message: FAILED_MESSAGE_TO_TARGET_ROUTER,
                    target_center: targetDc,
                    status: "-1",
                })
            }
        });
    }

    static getDataReqObjectHeaders(correlationId, headers) {
        let dataReqObjHeaders = {}
        const keys = Object.keys(headers)
        let regEx = /^[0-9a-zA-Z-_.:+/ ]+$/;
        keys.forEach(function (key) {
            if (headers[key].toString().length < 100
                && headers[key].toString().match(regEx)
            ) {
                dataReqObjHeaders[key] = headers[key].toString()

            }
        })
        return dataReqObjHeaders;
    }
};
// return {
// 	// Get the Singleton instance if one exists
// 	// or create one if it doesn't
// 	getInstance: function () {
// 		if (!_instance) {
// 			_instance = init();
// 		}
// 		return _instance;
// 	},
// };

// exports.start = function (done) {
// 	if (this._instance) { return done() };
// 	log.info("Connector: returning the existing connector handler instance");
// 	this._instance = connector.getInstance();
// };

// exports.instance = function () {
// 	return connector.getInstance();
// };

module.exports = Connector