const crypto = require('crypto');
const util = require('util')


function generateData(jobsCount, subTasksCount) {
    let jobDetails = []
    for (let i = 1; i <= jobsCount; i++) {
        let jobData = {
            "jobID": `job-id-${i}`,
            "startTime": new Date().toISOString(),
            "active": Math.random() > 0.5 ? true : false,
            "jobIntervalInSeconds": 30,
            "maxThreadsAllowed": Math.floor(Math.random() * 10) + 1,
            "retryLastFailedOnSuccess": Math.random() > 0.5 ? true : false,
            "numberOfRetriesBeforeFailing": Math.floor(Math.random() * 10) + 1,
            "retryIntervalInSeconds": 30,
            "supportsSubTasks": Math.random() > 0.5 ? true : false,
            "ignoreJobsBeforeSeconds": 10,
            "jobDescription": `Job Number ${i}`,
        }

        let subTasks = []

        for (let j = 1; j <= subTasksCount; j++) {
            let subTask = {
                "scheduledTime": new Date().toISOString(),
                "subtaskNo": j,
                "jobStatus": Math.random() > 0.5 ? 0 : 1,
                "pickId": crypto.randomUUID(),
                "attemptsMapde": 2,
                "endTime": new Date().toISOString(),
                "statusText": Math.random() > 0.5 ? "pending" : "completed"
            }

            subTasks.push(subTask)
        }

        jobData['jobDetails'] = subTasks

        jobDetails.push(jobData)
    }
    console.log(util.inspect(jobDetails, { showHidden: false, depth: null, colors: true }))
}


generateData(10, 5)