const xsenv = require('@sap/xsenv');
const hdb = require('hdb');
// const genericPool = require('generic-pool');
// const hana = require('@sap/hana-client');
const cfenv = require('cfenv');

xsenv.loadEnv()

// let appEnv = cfenv.getAppEnv();
// Database connection configuration
const config = {
    host: 'b81b6d1a-2af5-4118-b6ab-84d31013d043.hna1.prod-eu10.hanacloud.ondemand.com',
    port: 443,
    user: 'USR_6G51NL92PXU52L6JMW0MG9QTY',
    password: 'Co7cCYWgvq7PA9D7fuPylvJPs0NuK8TBLg-15zxwm07BWZu_vVxlhumy6lEAF9Aq-F6f2kUP2AecUlQuC.3jUJ76IySo7T1LaHRQBCzoHs93GaDBqugJb12182yAZOkX'
};
// if (appEnv.isLocal) {
// appEnv = cfenv.getAppEnv()
// }
// console.log(process.env.VCAP_SERVICES)
// const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES, '{}');
// const hanaObj = VCAP_SERVICES['hana'];
// const conn_params = {
//     host: hanaObj[0].credentials.host,
//     port: Number(hanaObj[0].credentials.port),
//     user: hanaObj[0].credentials.user,
//     password: hanaObj[0].credentials.password,
//     statementCacheSize: 25
// }


// Create a new client
const client = hdb.createClient(config);
// const client = hana.createConnection();
// Connect to the HANA DB
client.connect(function (err) {
    if (err) {
        console.error('Error connecting to HANA DB:', err);
        return;
    }
    console.log('Connected to the HANA DB');
});

// Method to execute a database query
function executeQuery(query, callback) {
    client.exec(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

// Method to retrieve data from a table
function getJobs(tableName, callback) {
    const query = `SELECT * FROM ${tableName}`;
    executeQuery(query, callback);
}

function getJobDetails(tableName, jobId, callback) {
    const query = `SELECT * FROM ${tableName} WHERE JOBID='${jobId}'`;
    executeQuery(query, callback);
}

function getCount(tableName, jobId, callback) {
    const query = `SELECT COUNT(*) FROM ${tableName} WHERE JOBID='${jobId}'`;
    executeQuery(query, callback);
}

// Export the database methods
module.exports = {
    getJobDetails,
    getJobs,
    getCount
};
