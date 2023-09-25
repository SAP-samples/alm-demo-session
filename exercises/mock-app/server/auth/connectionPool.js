"use strict";

const fs = require('fs');

//axios, http and custom agents
const axiosRetry = require("axios-retry");
const http = require("http");
const https = require("https");
const NUMBER_OF_RETRY = 3;
const landscapeConfigs = require('./landscapeConfig');
const axios = require("axios");
const connector = require("./connector");
const appEnv = require("cfenv").getAppEnv();
// let filePath = ''

// if (process.env.NODE_ENV.includes('local')) {
//     filePath = './certs/'
// } else {
//     filePath = '/etc/cf-instance-credentials/'
// }

class ConnectionPool {
    static _axiospool = new Map();
    static certKeyPairForMe = {};

    static async loadConnectionPool(certKeyPair) {
        // let certKeyPair = ''

        console.log('ConnectionPool: Loading Connection Pool')


        axiosRetry(axios, {
            retries: NUMBER_OF_RETRY,
            shouldResetTimeout: true,
            retryCondition: (_error) => true, // retry no matter what
        });

        ConnectionPool._axiospool.set('httpsAgent', axios.create({
            timeout: 60000,
            httpsAgent: new https.Agent({
                keepAlive: true,
                maxSockets: 10,
                maxFreeSockets: 3,
                timeout: 60000, // active socket keepalive for 60 seconds
                freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
                cert: certKeyPair,// fs.readFileSync(filePath + "instance.crt"),
                key: certKeyPair,//fs.readFileSync(filePath + "instance.key"),
            })
        }));

        ConnectionPool._axiospool.set('httpAgent', axios.create({
            timeout: 60000,
            httpAgent: new http.Agent({
                keepAlive: true,
                maxSockets: 10,
                maxFreeSockets: 3,
                timeout: 60000, // active socket keepalive for 60 seconds
                freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
                cert: certKeyPair,// fs.readFileSync(filePath + "instance.crt"),
                key: certKeyPair,//fs.readFileSync(filePath + "instance.key"),
            })
        }));

        console.log('ConnectionPool: Loaded Connection Pool')

    }

    static async init() {


        // Instantiate a single axios connection with a set off sockets for each datacenter
        // for (const datacenter of iterator) {
        // await ConnectionPool.loadConnectionPool()

        // setInterval(async () => {
        // 	await ConnectionPool.loadConnectionPool()
        // }, 5 * 60 * 1000)


        ConnectionPool._axiospool.set("httpAgent", axios.create({
            //60 sec timeout
            timeout: 60000,

            //keepAlive pools and reuses TCP connections, so it's faster
            httpAgent: new http.Agent({ keepAlive: true }),


            //follow up to 10 HTTP 3xx redirects
            maxRedirects: 10,

            //cap the maximum content length we'll accept to 50MBs, just in case
            maxContentLength: 50 * 1000 * 1000
        }));

        ConnectionPool._axiospool.set("httpsAgent", axios.create({
            //60 sec timeout
            timeout: 60000,

            //keepAlive pools and reuses TCP connections, so it's faster
            httpsAgent: new https.Agent({ keepAlive: true }),


            //follow up to 10 HTTP 3xx redirects
            maxRedirects: 10,

            //cap the maximum content length we'll accept to 50MBs, just in case
            maxContentLength: 50 * 1000 * 1000
        }));


    }

    static getConnection() {
        if (appEnv.isLocal) {
            return ConnectionPool._axiospool.get("httpAgent");
        } else {
            return ConnectionPool._axiospool.get("httpsAgent");
        }
    }
    static getCertKeyPair() {
        return this.certKeyPairForMe;
    }
    static setCertKeyPair(certificateAuth) {
        this.certKeyPairForMe = certificateAuth;
        // console.log("try here bitch", this.certKeyPairForMe);
    }
}

module.exports = ConnectionPool;