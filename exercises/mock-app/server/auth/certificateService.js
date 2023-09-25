'use strict'

const xsenv = require("@sap/xsenv");
xsenv.loadEnv()

// const oCfenv = require("cfenv");
// const oAppEnv = oCfenv.getAppEnv();

const { pki } = require('node-forge');

const fetch = require('node-fetch');
const { Buffer } = require('buffer');

const AxiosConnectionPool = require('./connectionPool');
const { response } = require("express");

// const destination = xsenv.getServices({ destination: { tag: "destination" } }).destination;
const destination = xsenv.cfServiceCredentials({ tag: 'destination' });
// let certKeyPair = ''

const parseBase64Certificate = (rawBase64) => {
    return pki.certificateFromPem(rawBase64);
}


const getOAuthToken = () => {
    return new Promise(function (resolve, reject) {
        // we make a post using x-www-form-urlencoded encoding for the body and for the authorization we use the
        // clientid and clientsecret.
        // Note we specify a grant_type and client_id as required to get the token
        // the request will return a JSON object already parsed

        fetch(`${destination.url}/oauth/token`, {
            method: "POST",
            json: true,
            headers: {
                'Authorization': 'Basic ' + Buffer.from(destination.clientid + ':' + destination.clientsecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${destination.clientid}`,
        }).then((response) => response.json())
            .then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })

        // function (error, response, body) {
        //     if (error) {
        //         log.error(`Connector: Failed to retrieve the token for the destination `)
        //         return reject(error);
        //     } else {
        //         // console.log('RESPONSE STATUS : ', response.statusCode, response.status)
        //         resolve(body);
        //     }
        // }
        // );
    });
}

const getCertificateAndValidate = async (certificateName, token) => {
    let isFound = false
    let isValid = false
    let certKeyPair = null

    try {
        console.log(`certificateService: Getting certificate :  ${certificateName}`)
        // const response = await request({
        //     url: `${destination.uri}/destination-configuration/v1/instanceCertificates/${certificateName}`,
        //     method: "GET",
        //     auth: {
        //         bearer: token.access_token,
        //     },
        //     json: true,
        // })

        const response = await fetch(
            `${destination.uri}/destination-configuration/v1/instanceCertificates/${certificateName}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token.access_token}`,
                'Content-Type': 'application/json'
            },
            // json: true,
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
            else {
                // console.log(response)
                if (response.status == 404) {
                    const resp = new Error('Configuration with the specified name was not found')
                    resp.statusCode = 404
                    return resp
                }
            }
        })

        if (response.statusCode == 404) {
            const result = {
                isFound: isFound,
                isValid: isValid,
                certKeyPair: certKeyPair
            }
            // console.log(result)
            return result
        }

        isFound = true
        // console.log(response)
        const bufferObj = Buffer.from(response.Content, "base64");
        const rawCertKeyObj = bufferObj.toString("utf8");

        const rawCertObj = rawCertKeyObj.replace(/-----BEGIN PRIVATE KEY[-=+\w\n\d\s/]*END PRIVATE KEY-----/g, '')

        const parcedCrt = parseBase64Certificate(rawCertObj)

        const t1 = parcedCrt.validity.notAfter
        const t2 = new Date()

        // console.log((t1 - t2) / (1000))
        if ((t1 - t2) > (60 * 60 * 1000)) {  // Check if Validity is greater than 1hr
            isValid = true
            certKeyPair = rawCertKeyObj
        }

    } catch (error) {
        // console.log(error)
        console.log('ERROR', error.response.statusCode)

        if (error.response.statusCode === 404) {
            isFound = false
        }

    }

    const result = {
        isFound: isFound,
        isValid: isValid,
        certKeyPair: certKeyPair
    }

    return result
}

const createCertificate = async (certificateName, token) => {
    console.log(`certificateService: Creating certificate :  ${certificateName}`)

    const options = {
        Name: certificateName,
        Attributes: {
            CN: `distrubutor-cert`,
            Validity: {
                TimeUnit: "DAYS",
                Value: 1
            },
            AutomaticRenew: true
        }
    }

    return new Promise(async (resolve, reject) => {
        await fetch(`${destination.uri}/destination-configuration/v1/instanceCertificates`, {
            method: "post",
            headers: {
                'Authorization': `Bearer ${token.access_token}`,
                'Content-Type': 'application/json'
            },
            // json: true,
            body: JSON.stringify(options),
            // resolveWithFullResponse: true
        }).then(async (response) => {
            console.log(response.status)
            if (!response.ok) {
                reject(await response.json())
            }
            else {
                resolve(response)
            }
        })
            .catch(error => {
                console.log(`certificateService: Error Creating certificate : ${certificateName} : ${error.message}`)
                reject(error)
            })
    })
    // .then(response => {
    //     console.log(response.statusCode)
    // })

}

const deleteCertificate = async (certificateName, token) => {
    console.log(`certificateService: Deleting certificate : ${certificateName}`)

    await fetch(`${destination.uri}/destination-configuration/v1/instanceCertificates/${certificateName}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            // 'Content-Type': 'application/json'
        },
    }).catch(error => {
        console.log(`certificateService: Error Deleting certificate : ${certificateName} : ${error.message}`)
    })
}

const certificateRuntimeFlow = async (certificateName, token) => {
    console.log(`certificateService: Certificate runtime flow Starting for cert:  ${certificateName}`)

    let result = await getCertificateAndValidate(certificateName, token)

    if (!result.isFound) {
        await createCertificate(certificateName, token)
        result = await getCertificateAndValidate(certificateName, token)
    } else if (!result.isValid) {
        await deleteCertificate(certificateName, token)
        await createCertificate(certificateName, token)
        result = await getCertificateAndValidate(certificateName, token)
    }
    // console.log('CERT KEY PAIR ', result.certKeyPair)

    // console.log('========================================')
    // console.log('Code to reload HTTP Agent in connection pool')

    AxiosConnectionPool.loadConnectionPool(result.certKeyPair)
    AxiosConnectionPool.setCertKeyPair(result.certKeyPair);
}

const Init = async () => {
    const timeOut = 45 * 60 * 1000 // 45 Minutes Time Interval
    let token = await getOAuthToken();
    const certificateName = `distrubutor-cert.pem` //'distrubutor-cert.pem'

    await certificateRuntimeFlow(certificateName, token)

    setInterval(async () => {
        token = await getOAuthToken();
        certificateRuntimeFlow(certificateName, token)
    }, timeOut)
}

// Init()

module.exports = {
    Init: Init,
    getOAuthToken: getOAuthToken,
    getCertificateAndValidate: getCertificateAndValidate,
    createCertificate: createCertificate,
    deleteCertificate: deleteCertificate,
    certificateRuntimeFlow: certificateRuntimeFlow
}




// getCertificate('distrubutor-cert.pkem')
// createCetificateIfNotExists()