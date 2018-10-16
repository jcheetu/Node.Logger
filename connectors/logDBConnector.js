module.exports = LogDBConnector;



function LogDBConnector(Source) {
    this.logConnector = {
        "Activity": null,
        "Audit": null
    };

    var DbConn = "";
    if (Source.toString().toUpperCase() == "MSSQL") {
        DbConn = new (require("./MSSQLConnect"));
    }


    this.logConnector.Activity = function () {
        return DbConn.logActivityConnector();
    }
    this.logConnector.Audit = function () {
        return DbConn.logAuditConnector();
    }


}

