module.exports = MSSQLConnect;

function MSSQLConnect() {
    var loggerConfig = new (require('../config/loggerConfig'));
    //var mssql = require('mssql');
    //var auditConn = loggerConfig.auditConn;
    //mssql.connect(loggerConfig.auditConn).then(function (connection) {
    //    auditConn = connection;
    //}).catch(function (err) {
    //    console.error(err);
    //});


    var mssql_activity = require('mssql');

    //mssql_activity.connect(loggerConfig.activityConn).then(function (connection) {
    //    activityConn = connection;
    //}).catch(function (err) {
    //    console.error(err);
    //});

    const activityPool = new mssql_activity.ConnectionPool(loggerConfig.activityConn, err => {
        activityConn = activityPool;
    })
    const auditPool = new mssql_activity.ConnectionPool(loggerConfig.auditConn, err => {
        auditConn = auditPool;
    })

    this.logAuditConnector = function () {
        return auditConnector();
    }
    this.logActivityConnector = function () {
        return activityConnector();
    }
}

function auditConnector() {
    var logAudit = require('log4js');
    var msSqlAppender = require('log4js-node-mssql');
    logAudit.clearAppenders();
    logAudit.addAppender(msSqlAppender.appender({
        connection: auditConn,
        commandText: `INSERT INTO [dbo].[PC_Logging_AuditLog]
           ([AuthenticationToken]
           ,[ClientId]
           ,[UserEmail]
           ,[IP]
           ,[InterfaceName]
           ,[ModuleName]
           ,[MethodName]
           ,[ActionTaken]
           ,[ActionType]
           ,[Description]
           ,[Platform]
           ,[CreatedBy]
           ,[CreatedOn])
     VALUES
        (   @AuthenticationToken
           ,@ClientId
           ,@UserEmail
           ,@IP
           ,@InterfaceName
           ,@ModuleName
           ,@MethodName
           ,@ActionTaken
           ,@ActionType
           ,@Description
           ,@Platform
           ,@CreatedBy
           ,@CreatedOn)`,
        parameters: [
            {
                name: '@AuthenticationToken',
                dbType: 'String'
            },
            {
                name: '@ModuleId',
                dbType: 'Int'
            },
            {
                name: '@ClientId',
                dbType: 'Int'
            },
            {
                name: '@UserEmail',
                dbType: 'String'
            },
            {
                name: '@IP',
                dbType: 'String'
            },
            {
                name: '@InterfaceName',
                dbType: 'String'
            },
            {
                name: '@ModuleName',
                dbType: 'String'
            },
            {
                name: '@MethodName',
                dbType: 'String'
            },
            {
                name: '@ActionTaken',
                dbType: 'String'
            },
            {
                name: '@ActionType',
                dbType: 'String'
            },
            {
                name: '@Description',
                dbType: 'String'
            },
            {
                name: '@Platform',
                dbType: 'CHAR'
            },
            {
                name: '@CreatedBy',
                dbType: 'Int'
            },
            {
                name: '@CreatedOn',
                dbType: 'DateTime'
            }
        ]

    }));
    return logAudit.getLogger();
}

function activityConnector() {
    var logActivity = require('log4js');
    var msSqlAppender = require('log4js-node-mssql');
    logActivity.clearAppenders();
    logActivity.addAppender(msSqlAppender.appender({
        connection: activityConn,
        commandText: `INSERT INTO [dbo].[PC_Logging_ActivityLog]
           ([LogType]
           ,[ModuleId]
           ,[ClientId]
           ,[UserEmail]
           ,[InterfaceName]
           ,[ModuleName]
           ,[MethodName]
           ,[ActionTaken]
           ,[ActionType]
           ,[Description]
           ,[Platform]
           ,[CreatedBy]
           ,[CreatedOn])
     VALUES
        (   @LogType
           ,@ModuleId
           ,@ClientId
           ,@UserEmail
           ,@InterfaceName
           ,@ModuleName
           ,@MethodName
           ,@ActionTaken
           ,@ActionType
           ,@Description
           ,@Platform
           ,@CreatedBy
           ,@CreatedOn)
`,
        parameters: [
            {
                name: '@LogType',
                dbType: 'String'
            },
            {
                name: '@ModuleId',
                dbType: 'Int'
            },
            {
                name: '@ClientId',
                dbType: 'Int'
            },
            {
                name: '@UserEmail',
                dbType: 'String'
            },
            {
                name: '@InterfaceName',
                dbType: 'String'
            },
            {
                name: '@ModuleName',
                dbType: 'String'
            },
            {
                name: '@MethodName',
                dbType: 'String'
            },
            {
                name: '@ActionTaken',
                dbType: 'String'
            },
            {
                name: '@ActionType',
                dbType: 'String'
            },
            {
                name: '@Description',
                dbType: 'String'
            },
            {
                name: '@Platform',
                dbType: 'CHAR'
            },
            {
                name: '@CreatedBy',
                dbType: 'Int'
            },
            {
                name: '@CreatedOn',
                dbType: 'DateTime'
            }
        ]

    }));
    return logActivity.getLogger();



}

/* supported datatypes
case 'DATETIME':
            case 'DATE':
            case 'DATETIME2':
            case 'SMALLDATETIME':
            case 'TIME':
                value = "'" + new Date(value).toISOString() + "'";
                break;
            // Numerics
            case 'BIGINT':
            case 'NUMERIC':
            case 'BIT':
            case 'SMALLINT':
            case 'SMALLMONEY':
            case 'INT':
            case 'TINYINT':
            case 'MONEY':
            case 'FLOAT':
            case 'REAL':
                value = value;
                break;
            // Strings
            case 'CHAR':
            case 'VARCHAR':
            case 'TEXT':
            case 'NCHAR':
            case 'NVARCHAR':
            case 'NTEXT':
            case 'STRING':
*/

