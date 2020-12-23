

// const MongoClient = require('mongodb').MongoClient;
// const { AssertionError } = require('assert');
// const connectionURL = configData.mongo.connectionURL
// const databaseName = configData.mongo.databaseName
const comm = require("./common")
const assert = require('assert');

let configData = require("../config")
const usercollection = configData.mongo.collectionName

module.exports = {
    createDocument: async function (esyObj, db, client) {
        return new Promise(async (res, rej) => {
            try {
                const collection = db.collection(usercollection);
                collection.insertMany(esyObj, function (err, result) {
                    assert.equal(err, null)
                    if (err) {
                        return rej(err)
                    }
                    try {
                        assert.equal(esyObj.length, result.result.n);
                        assert.equal(esyObj.length, result.ops.length);
                        return res(result.ops)
                    } catch (error) {
                        return rej("Assertion Error")
                    }
                });
            } catch (e) {
                console.log("e", e)
                return rej("Someting Went wrong")
            }

        })
    }
}