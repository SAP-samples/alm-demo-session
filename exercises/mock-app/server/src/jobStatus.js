const scopeCheck = require('../utils/scopeCheck');
const AxiosConnectionPool = require("../auth/connectionPool");

class JobStatus {


    async getjobStatus(req, res, next) {
        // scopeCheck.checkA2ADisplay(req, res, next);
        const jobDetails = require('../jobDetails');
        res.json(jobDetails)

    }
}
module.exports = new JobStatus();