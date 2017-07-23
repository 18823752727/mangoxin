let mongoskin = require('mongoskin'),
    config = require('../config');

module.exports = (function() {
    let host = config.host,
        port = config.port,
        dbName = config.dbname,
        str = "mongodb://" + host + ':' + port + '/' + dbName;

    var option = {
        native_parser: true
    };

    console.log(str);
    return mongoskin.db(str, option);
})