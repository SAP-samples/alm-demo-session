const crypto = require('crypto');

module.exports = [
    {
        jobID: 'job-id-1',
        startTime: '2023-09-25T05:40:14.975Z',
        active: true,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 6,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 4,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 1',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.975Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: '7fd640f4-0bf7-4103-8df2-a9a0c04c5735',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 0,
                pickId: '6fa4dd06-8fbf-432f-8c54-b4741ae7bb01',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: '43cc7b81-3789-4495-8deb-6c908b8e73d4',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: 'db509563-9297-40d5-827c-9d935a74a896',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 1,
                pickId: '1cb1be7f-d608-473b-b526-60bda5dcc8e4',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            }
        ]
    },
    {
        jobID: 'job-id-2',
        startTime: '2023-09-25T05:40:14.976Z',
        active: false,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 9,
        retryLastFailedOnSuccess: true,
        numberOfRetriesBeforeFailing: 5,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 2',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: 'd3d4fbba-84b8-43e3-8b3b-8ab6ba065139',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 0,
                pickId: '8b8b89b0-c84b-4867-a73f-2b43176908fc',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: '960a2f3a-c104-4094-9f24-75133071c68f',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: '59e3cc46-655c-48a5-9134-ab00a569ec5f',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 1,
                pickId: '58bb872f-71b9-4f4d-a3bd-b31a816152fd',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-3',
        startTime: '2023-09-25T05:40:14.976Z',
        active: false,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 10,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 7,
        retryIntervalInSeconds: 30,
        supportsSubTasks: false,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 3',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: '3c69173d-bf6e-4c8a-8ade-1a0423edb271',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 1,
                pickId: '659d9ddd-6f93-49fb-929a-4f7313a10024',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: '6d1e9272-996c-446c-8769-39afc36f307c',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: '911b89ce-26d9-4792-920a-def378a88fde',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 1,
                pickId: '0ed7b399-6f5f-48a8-98ba-768b7d351123',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-4',
        startTime: '2023-09-25T05:40:14.976Z',
        active: true,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 2,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 7,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 4',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 1,
                pickId: 'dc7b4522-ef07-4f01-92d2-d567cfae456d',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 1,
                pickId: '2887f6c6-0d18-41e0-b768-72d4a68c407f',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 1,
                pickId: '15b16021-b8b3-48c5-bc71-ce11ec78c8a7',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: 'b501de11-e8a7-47b7-b68e-14b241fe5f83',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 0,
                pickId: 'e5fb0213-6851-4fd9-9327-9aca60372d16',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-5',
        startTime: '2023-09-25T05:40:14.976Z',
        active: true,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 3,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 7,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 5',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 1,
                pickId: '4947a260-b12e-4a7a-b226-0a5b1a14f8ea',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 0,
                pickId: 'a4dd7eff-b840-40d2-97e2-3b8706c382fb',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: '1055d243-dbdd-4a1d-a8cc-0029bbd01e56',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 0,
                pickId: '6e6b4435-94c4-4f54-92ea-0f784efa98a6',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 0,
                pickId: '47db9327-ed02-4db6-b708-06cc59ef888f',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            }
        ]
    },
    {
        jobID: 'job-id-6',
        startTime: '2023-09-25T05:40:14.976Z',
        active: false,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 6,
        retryLastFailedOnSuccess: true,
        numberOfRetriesBeforeFailing: 4,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 6',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: 'e13c502c-3d20-49bb-9797-2b36c5d5a333',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 1,
                pickId: 'fff4b2c1-c034-48a6-99ec-4a92240da29b',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 1,
                pickId: '99c5de62-11c5-44f3-8b67-0f57750230b1',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: 'e6c0d57a-84ea-452f-8e30-dff3e0ed0faa',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 1,
                pickId: '4ed758fa-eef9-4d26-931a-e427dcf0e8a8',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-7',
        startTime: '2023-09-25T05:40:14.976Z',
        active: true,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 5,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 7,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 7',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 1,
                pickId: 'db077874-b09e-478a-bf13-20f500f7f199',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 1,
                pickId: '00754efa-9ed0-4f77-afb2-ec5343ab3560',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 1,
                pickId: '3f5d3763-cbc8-4bdb-b132-c9b4c66c2a4a',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: '4c727eba-998b-4a5b-a3bc-4f0e9953e188',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 1,
                pickId: 'eb85d49a-0542-4416-89ff-e7fbfd4e0acd',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-8',
        startTime: '2023-09-25T05:40:14.976Z',
        active: false,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 7,
        retryLastFailedOnSuccess: false,
        numberOfRetriesBeforeFailing: 3,
        retryIntervalInSeconds: 30,
        supportsSubTasks: false,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 8',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: 'ed039c40-8867-41b6-8243-4e49eca1ce63',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 0,
                pickId: '1879f72b-23ad-4d1e-aabd-b28766b21183',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 1,
                pickId: 'c0457a16-a8e1-4752-bcdc-7ba4c8bb9f1f',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 0,
                pickId: '46062287-f912-417d-94e7-71ed27fa24cb',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 0,
                pickId: 'a8814fd4-4979-452a-95db-71daa7a0da22',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            }
        ]
    },
    {
        jobID: 'job-id-9',
        startTime: '2023-09-25T05:40:14.976Z',
        active: true,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 8,
        retryLastFailedOnSuccess: true,
        numberOfRetriesBeforeFailing: 5,
        retryIntervalInSeconds: 30,
        supportsSubTasks: false,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 9',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 0,
                pickId: 'd22b7dcd-be35-48e7-895e-e163636fe040',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 1,
                pickId: '3dc81b8a-c8e8-45ac-8cda-f3a54efddd4d',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: '5574813a-1415-44b7-a02a-0e398a77e200',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 1,
                pickId: '5e659972-3bc8-49f0-8929-b39e88deb28d',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 0,
                pickId: '5f9d47e0-a5fe-448a-a3d8-629132857306',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    },
    {
        jobID: 'job-id-10',
        startTime: '2023-09-25T05:40:14.976Z',
        active: false,
        jobIntervalInSeconds: 30,
        maxThreadsAllowed: 6,
        retryLastFailedOnSuccess: true,
        numberOfRetriesBeforeFailing: 8,
        retryIntervalInSeconds: 30,
        supportsSubTasks: true,
        ignoreJobsBeforeSeconds: 10,
        jobDescription: 'Job Number 10',
        jobDetails: [
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 1,
                jobStatus: 1,
                pickId: 'f380cfa2-962c-4416-a32f-28f0d78ea25e',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 2,
                jobStatus: 0,
                pickId: '109c9dc1-dc3f-46e3-b4f1-ad0f0ba5ef9e',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'completed'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 3,
                jobStatus: 0,
                pickId: 'e18342db-4389-46c9-949e-239d109731cc',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 4,
                jobStatus: 0,
                pickId: 'a27ab63b-357e-4f21-bb00-5143d3c75c8e',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            },
            {
                scheduledTime: '2023-09-25T05:40:14.976Z',
                subtaskNo: 5,
                jobStatus: 0,
                pickId: '9fbaecab-5c69-410f-8915-576bffc0e63e',
                attemptsMade: 2,
                endTime: '2023-09-25T05:40:14.976Z',
                statusText: 'pending'
            }
        ]
    }
]
