
const MongoClient = require('mongodb').MongoClient;

let configData = require("../config")
const connectionURL = configData.mongo.connectionURL
const databaseName = configData.mongo.databaseName

module.exports = {
    createMongoConnection: function () {
        return new Promise((res, rej) => {
            MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                // console.log("err", err)
                if (err) {
                    return rej(err)
                }
                console.log("Successfully Connected to MogoDB server.");
                const db = client.db(databaseName);
                return res([db, client])
            });
        })
    }

}
