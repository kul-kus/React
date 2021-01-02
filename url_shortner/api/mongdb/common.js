
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
    },
    createQuery: function (query) {
        let finalQuery = {}
        if (self.checkJson(query)) {
            query = self.convertJson(query)
        }

        Object.keys(query).map(curr => {
            let arr = query[curr].split(" ")
            if (arr.length == 1) {
                finalQuery[curr] = arr[0]
            } else {
                arr[1] = (!isNaN(arr[1])) ? Number(arr[1]) : arr[1]

                finalQuery[curr] = (arr[0] == "in") ? (
                    {
                        "$regex": `.*${arr[1]}.*`
                    }) : (
                        {
                            ["$" + arr[0]]: arr[1]
                        })
            }
        })
        return finalQuery

    },


    convertJson: function (str) {
        try {
            str = (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            return str;
        }
        return str;
    },
    checkJson: function (str) {
        try {
            (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            return false;
        }
        return true;
    }
}

var self = module.exports
