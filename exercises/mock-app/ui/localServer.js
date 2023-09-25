var path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()

const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

//const sapui5 = require('sapui5-runtime');

//app.use('/resources', express.static(sapui5));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '/webapp')));

app.listen(process.env.PORT || 5000, function () {
    console.log('App is listening on port 5000!');
});
