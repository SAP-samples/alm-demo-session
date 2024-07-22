require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const scopeCheck = require('./utils/scopeCheck');
const jobDetails = require('./src/jobDetails');
const jobStatus = require('./src/jobStatus');

const port = process.env.PORT || 4000;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.get('/srv/getScope', scopeCheck.checkAuthorization);

app.get('/srv/getJobStatus', jobStatus.getjobStatus);

app.post('/srv/getJobDetails/:jobId', jobDetails.getjobDetails);
app.get('/srv/getCsrfToken', (req, res, next) => {
    console.log("inside csrf ka get call");
    res.send("okay");
});
app.get('/srv/getCount/:jobId', (req, res) => {
    let jobId = req.params.jobId;

    const jobDetails = require('./jobDetails')

    for (let job of jobDetails) {
        if (job.jobID === jobId) {
            return res.json({
                count: job.jobDetails.length
            });
        }
    }
    return res.json({
        count: 0
    });
});
app.get('/srv/getUser', (req, res) => {
    res.json({ "userId": "user-id" })
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).send({
        error: {
            code: status,
            message: err.message,
            target: req.url
        }
    });
    next();
});
// app.use('/', express.static(path.join(__dirname, '../ui/webapp')));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
