module.exports = loggerConfig;


function loggerConfig(Source) {
    this.ConnectMSSQL = "MSSQL";
    this.ActivityLoggerLevel = "FATAL"; // 'ALL','OFF','TRACE','DEBUG','INFO','WARN','ERROR','FATAL', 'MARK'

    this.activityConn = {
        user: 'jyoti',
        password: 'jyoti@2012',
        server: '192.168.0.176\\MSSQLSERVER12',
        database: 'PrimeCloud_Beta_8',
        options: {
            encrypt: true // Use this if you're on Windows Azure 
        }
    }
    this.auditConn = {
        user: 'jyoti',
        password: 'jyoti@2012',
        server: '192.168.0.176\\MSSQLSERVER12',
        database: 'PrimeCloud_Beta_8',
        options: {
            encrypt: true // Use this if you're on Windows Azure 
        }
    }
}

