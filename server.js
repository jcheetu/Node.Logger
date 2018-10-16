var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var loggerConfig = new (require('./config/loggerConfig'));

var dbConnect = loggerConfig.ConnectMSSQL;

var logDBConnect = new (require('./connectors/logDBConnector'))(dbConnect);

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

app.post('/Audit', function (req, res) {
    /* contract
    {
   "AuthenticationToken": 1,
   "ClientId": 1,
   "UserEmail" : "j@c.com",
   "IP" : "192.168.0.1",
   "InterfaceName": "InterfaceName",
   "ModuleName": "testJCheetu",
   "MethodName": "MethodName",
   "ActionTaken": "Log INsert",
   "ActionType": "ActionType",
   "Description": null,
   "Platform": "WEB",
   "CreatedBy": 1,
    }
    */
    try {
        var reqObj = {};

        try {
            reqObj = req.body;
            reqObj.CreatedOn = new Date();
        }
        catch (ex) {
            res.status(500).send('False Contract!')
        }
        var logger = logDBConnect.logConnector.Audit();
        logger.setLevel((new require('log4js')).levels["TRACE"]);

        logger.trace(reqObj);
        res.status(200).send("OK");
    }
    catch (ex) {
        res.status(500).send('Something broke!');
    }

})

app.post('/Activity', function (req, res) {
    /* contract
     {
	"ModuleId": 1,
	"ClientId": 1,
	"UserEmail" : "j@c.com",
	"InterfaceName": "InterfaceName",
	"ModuleName": "testJCheetu",
	"MethodName": "MethodName",
	"ActionTaken": "Log INsert",
	"ActionType": "ActionType",
	"Description": null,
	"Platform": "WEB",
	"CreatedBy": 1,
	"LogType" : "info" 
    }
     */
    try {
        var reqObj = {};
        try {
            reqObj = req.body;
            reqObj.CreatedOn = new Date();
            //reqObj.LogType = req.body["LogType"].toString().toUpperCase().toString().trim();
        }
        catch (ex) {
            res.status(500).send('False Contract!');
        }

        var logger = (logDBConnect.logConnector.Activity());
        logger.setLevel((new require('log4js')).levels[loggerConfig.ActivityLoggerLevel]);

        logger[reqObj["LogType"]](reqObj);


        res.status(200).send("OK");

    }
    catch (ex) {
        res.status(500).send('Something broke!');
    }
});



//var server = app.listen(process.env.PORT, function () {

//});

var server = app.listen(1337, function () {

})