require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
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
    const tableName = 'A2AJOB_SCHEDULE_DCR';
    let jobId = req.params.jobId;
    db.getCount(tableName, jobId, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            const error = new Error('Failed to fetch data from the database');
            error.status = 500;
            return next(error);
        }
        res.json(result);
    });
});
app.get('/srv/getUser', (req, res) => {
    res.json({ "userId": "user-id" })
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (req.db) {
        req.db.rollback();
        req.logObj.addLog(error, 'error');
        req.logObj.addDbLogs(req.db.getLogs());
        req.db.insertLog(req.logObj.getLog());
        req.logObj.writeLog();
        req.db.closeConnection();
    }
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
