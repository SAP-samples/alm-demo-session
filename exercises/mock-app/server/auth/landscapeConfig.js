'use strict';

// const request = require('request-promise')
const yaml = require('js-yaml');

const fetch = import('node-fetch')
const { Buffer } = require('buffer');

const xsenv = require("@sap/xsenv");
xsenv.loadEnv();

//Logger

//ConnectionPool
const axios = require("axios");


let spaceMap = {}
let landscapeMap = {}
let useCaseMap = {}
let datacenterMap = {}

// let allDataCenters = []

const user = process.env.user
const secretkey = process.env.pass

// logger.debug(`${user}, ${pass}`)


//CALM/app2app-configuration/tree/main/inbound/configs

const gitApiUrl = process.env.GIT_URL + '/api/v3/repos/CALM/app2app-configuration/contents/outbound/configs'
// destination-configuration/v1/instanceDestinations
const fileName = 'dc-landscape-config.yaml'

const USECASE = 'usecase-space';
/**
 * The function that reads the YAMLs from GitHub and parses it into HashMap object
 * @returns {Promise}
 */
const loadConfigs = async () => {
    return new Promise(async (resolve, reject) => {
        console.log("loading datacenters,landscapes YAML")
        try {
            spaceMap = {}
            landscapeMap = {}
            useCaseMap = {}
            datacenterMap = {}

            const reqOps = {
                // uri: gitApiUrl,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(user + ":" + secretkey).toString('base64')
                }
            }
            // const response = await request(reqOps)
            // const resObj = JSON.parse(response)

            const response = await fetch(gitApiUrl, reqOps)
            let resObj = []
            if (response.ok) {
                resObj = await response.json()
            }

            // console.log(resObj)

            let configUrl

            resObj.forEach(obj => {
                if (obj.name === fileName) {
                    configUrl = obj.download_url
                }
            });

            // console.log('configURl', configUrl)
            // await connectionPool.init();
            // let ymlResponse = await connectionPool.getConnection("github").get(configUrl);

            const options = {
                url: configUrl,
                method: "GET",
            };

            const ymlResponse = await axios(options);

            // console.log(ymlResponse.data)
            //for (let i = 0; i < responses.length; i++) {
            const yml = yaml.load(ymlResponse.data);

            // console.log("dataCenters", yml.datacenters)

            // for (let i = 0; i < yml.datacenters.length; i++) {
            //     let datacenterObj = yml.datacenters[i]
            yml.datacenters.forEach(datacenterObj => {

                // console.log('YAML Keys', Object.keys(datacenterObj))
                const datacenter = Object.keys(datacenterObj)[0]
                const landscapes = datacenterObj.landscapes

                // allDataCenters.push(datacenter)
                // for (let j = 0; j < landscapes.length; j++) {
                //     let landscapeObj = landscapes[j]
                landscapes.forEach(landscapeObj => {
                    //console.log('Landscape Object', landscapeObj)
                    // console.log('Landscape Keys', Object.keys(landscapeObj))
                    // console.log('Landscape Object', landscapeObj)
                    const landscapeName = Object.keys(landscapeObj)[0]

                    const ingress_space = landscapeObj[landscapeName]['ingress-space']

                    const space_key = ingress_space
                    const landscape_dc_key = landscapeName + '-' + datacenter
                    const dc_key = datacenter

                    // console.log(space_key)

                    landscapeMap[landscape_dc_key] = {
                        datacenter: datacenter,
                        ingress_space: landscapeObj[landscapeName]['ingress-space'],
                        destination: landscapeObj[landscapeName]['destination'],
                        urlTargetMap: landscapeObj[landscapeName]['urlTargetMap'],
                        usecase_space: landscapeObj[landscapeName][USECASE]
                    }
                    useCaseMap[landscapeObj[landscapeName]['usecase-space']] = landscapeName;

                    if (datacenterMap[dc_key]) {
                        const landscapesSupported = datacenterMap[dc_key].landscapes
                        // if (!landscapesSupported.includes(landscapeName)) {
                        landscapesSupported.push(landscapeName)
                        // }
                        datacenterMap[dc_key].landscapes = landscapesSupported

                    } else {
                        datacenterMap[dc_key] = {
                            landscapes: [landscapeName]
                        }
                    }

                    if (spaceMap[space_key]) {
                        const datacentersSupported = spaceMap[space_key].datacenters
                        const landscapesSupported = spaceMap[space_key].landscapes
                        const usecaseSpaces = spaceMap[space_key].usecaseSpaces

                        // const landscapesSupported = spaceMap[space_key].landscapes
                        //landscapesSupported.push(landscapeName)
                        // const usecaseSpaces = spaceMap[space_key].usecaseSpaces
                        // if (usecaseSpaces.indexOf(landscapeObj[landscapeName]['usecase-space']) == -1) {
                        //     usecaseSpaces.push(landscapeObj[landscapeName]['usecase-space'])
                        // }

                        setSupportedLandscapeAndDC(datacentersSupported, landscapesSupported, datacenter, landscapeName, usecaseSpaces, landscapeObj)
                        spaceMap[space_key].datacenters = datacentersSupported
                        spaceMap[space_key].landscapes = landscapesSupported
                        spaceMap[space_key].usecaseSpaces = usecaseSpaces

                    } else {
                        spaceMap[space_key] = {
                            datacenters: [datacenter],
                            landscapes: [landscapeName],
                            usecaseSpaces: {
                                [`${landscapeName}`]: [landscapeObj[landscapeName][USECASE]]
                            }
                        }

                    }
                    // console.log('HASHMAP ',hashMap)

                })
            });
            // console.log(allDataCenters)
            // console.log(spaceMap)
            // console.log(datacenterMap)
            // console.log(landscapeMap)
            // console.log(useCaseMap)
            console.log(`Landscape configurations Fetched`)
            resolve({
                status: "Configs loaded",
                spaceMap: spaceMap,
                datacenterMap: datacenterMap,
                landscapeMap: landscapeMap,
                useCaseMap: useCaseMap
            })
        }
        catch (error) {
            // console.log("Error loading YAMLs")
            console.log(`Error Loading YAMLs`)
            reject(error)
        }
    })
}

function setSupportedLandscapeAndDC(datacentersSupported, landscapesSupported, datacenter, landscapeName, usecaseSpaces, landscapeObj) {
    if (!datacentersSupported.includes(datacenter)) {
        datacentersSupported.push(datacenter)
    }

    if (!landscapesSupported.includes(landscapeName)) {
        landscapesSupported.push(landscapeName)
    }

    if (usecaseSpaces[landscapeName]) {
        usecaseSpaces[landscapeName].push(landscapeObj[landscapeName][USECASE])
    } else {
        usecaseSpaces[landscapeName] = [landscapeObj[landscapeName][USECASE]]
    }
}

// loadConfigs()
function getAllTopicCombinations(spaceName) {
    // await loadConfigs()
    const spaceObj = spaceMap[spaceName]

    const supportedDCs = spaceObj.datacenters
    const supportedLandscapes = spaceObj.landscapes

    const allDCs = Object.keys(datacenterMap)

    // const allOtherDCs = allDCs.filter(dc => !supportedDCs.includes(dc));
    const allOtherDCs = allDCs.filter(dc => supportedDCs.length > 1 || !supportedDCs.includes(dc));


    const dsTopics = []

    const retry_5m_topics = []
    const retry_30m_topics = []
    const retry_60m_topics = []


    // console.log(supportedDCs, allDCs, allOtherDCs, supportedLandscapes)
    // console.log('All Topics')
    for (let i = 0; i < supportedLandscapes.length; i++) {
        for (let j = 0; j < allOtherDCs.length; j++) {
            const key = supportedLandscapes[i] + '-' + allOtherDCs[j]
            if (landscapeMap[key] && landscapeMap[key].usecase_space !== 'not-supported') {
                spaceObj.usecaseSpaces[supportedLandscapes[i]].forEach(usecaseSpace => {
                    if (usecaseSpace !== 'not-supported') {
                        const dsTopic = 'ds' + '.' + usecaseSpace + '.' + landscapeMap[key].datacenter
                        const retry_5m = 'retry_5m' + '.' + usecaseSpace + '.' + landscapeMap[key].datacenter
                        const retry_30m = 'retry_30m' + '.' + usecaseSpace + '.' + landscapeMap[key].datacenter
                        const retry_60m = 'retry_60m' + '.' + usecaseSpace + '.' + landscapeMap[key].datacenter

                        // console.log(topic)
                        dsTopics.push(dsTopic)
                        // errorTopics.push(errorTopic)

                        retry_5m_topics.push(retry_5m)
                        retry_30m_topics.push(retry_30m)
                        retry_60m_topics.push(retry_60m)
                    }
                })
            }

        }

    }
    console.log(dsTopics, retry_5m_topics, retry_30m_topics, retry_60m_topics)
    // console.log(errorTopics)
    return {
        dsTopics: dsTopics,
        retry_5m_topics: retry_5m_topics,
        retry_30m_topics: retry_30m_topics,
        retry_60m_topics: retry_60m_topics,
        // errorTopics: errorTopics
    }

}

// getAllTopicCombinations('calm-test-ingress-eu10')

const getAllDestinations = () => {
    return Object.keys(landscapeMap)
}


const getDestination = (landscape, datacenter) => {
    return landscapeMap[landscape + "-" + datacenter].destination;
}

const getPhysicalDCMAp = (landscape, datacenter) => {
    const mappedLandscape = landscapeMap[landscape + "-" + datacenter].urlTargetMap.split(':')[0];
    const mappedDC = landscapeMap[landscape + "-" + datacenter].urlTargetMap.split(':')[1];

    return { mappedLandscape, mappedDC }
}

const getLandscape = (useCase) => {
    return useCaseMap[useCase];
}


// /**
//  * This fuctions returns the hasmap value (configuration for usecase) for a given key
//  * If the YAMLs are already loaded it retrieves the HashMap value directly
//  * Else it loads the Yamls, then retrieves the HashMap value
//  * @param {string} key --the HashMap key to identify usecase configs <stage>-<usecase>-<version>
//  * @returns
//  */
// let get = async (key) => {
//     if (isLoaded) {
//         logger.debug('using loaded')
//         return spaceMap[key]
//     } else {
//         logger.debug('loading...')
//         await loadConfigs()
//         return spaceMap[key]
//     }
// }




module.exports = {
    loadConfigs: loadConfigs,
    getDestination: getDestination,
    getPhysicalDCMAp: getPhysicalDCMAp,
    getLandscape: getLandscape,
    getAllTopicCombinations: getAllTopicCombinations,
    getAllDestinations: getAllDestinations
}