// create instance of Mongodb client
const MongoClient = require("mongodb").MongoClient;

// connection to Mongodb instance
const MongoURL = "mongodb://localhost:27017";


// get database connection function
function getConnection(callback)
{
    // connect mongoUrl to mongo instance
    return MongoClient.connect(MongoURL, callback)
}

module.exports = {
    getConnection
}