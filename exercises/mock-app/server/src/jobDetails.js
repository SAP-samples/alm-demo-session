const db = require('../db');
const scopeCheck = require('../utils/scopeCheck');
const AxiosConnectionPool = require("../auth/connectionPool");
class JobDetails {

    async getjobDetails(req, res, next) {

        let jobId = req.params.jobId;
        // scopeCheck.checkA2AAdmin(req, res, next);

        console.log("jobId", jobId)

        const jobDetails = require('../jobDetails')

        for (let job of jobDetails) {
            if (job.jobID === jobId) {
                const subJobs = []
                job.jobDetails.map((jobDetail) => {
                    let obj = {
                        JOBID: job.jobID,
                        SCHEDULEDTIME: jobDetail.scheduledTime,
                        SUBTASKNO: jobDetail.subtaskNo,
                        JOBSTATUS: jobDetail.jobStatus,
                        PICKID: jobDetail.pickId,
                        ATTEMPTSMADE: jobDetail.attemptsMade,
                        STARTTIME: job.startTime,
                        ENDTIME: jobDetail.endTime,
                        STATUSTEXT: jobDetail.statusText,
                    }
                    subJobs.push(obj)
                })
                return res.json(subJobs);

            }
        }
        res.json([])
    }
}
module.exports = new JobDetails();