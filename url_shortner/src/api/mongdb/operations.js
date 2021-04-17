

// const MongoClient = require('mongodb').MongoClient;
// const { AssertionError } = require('assert');
// const connectionURL = configData.mongo.connectionURL
// const databaseName = configData.mongo.databaseName
const comm = require("./common")
const assert = require('assert');

let configData = require("../../config")
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
    },
    getDocument: function (filterQuery = {}, db, client, getAll = false) {
        filterQuery = comm.createQuery(filterQuery)
        console.log("filterQuery===>", filterQuery)
        var sortingMethod = { createdDate: -1 }
        // if (!getAll) {
        //     filterQuery["isDeleted"] = "false"
        // }
        return new Promise(async (res, rej) => {
            try {
                const collection = db.collection(usercollection);

                collection.find(filterQuery).sort(sortingMethod).toArray(function (err, docs) {
                    try {
                        if (err) {
                            return rej(err)
                        }
                        assert.equal(err, null);
                        return res(docs)
                    } catch (error) {
                        return rej("Assertion Error")
                    }
                });
            } catch (e) {
                console.log("e", e)
                return rej("Someting Went wrong")
            }

        })
    },
    updateDocument: function (filterQuery, updateObj, db, client) {
        console.log("filterQuery-->Update", filterQuery)
        console.log("updateObj", updateObj)
        return new Promise(async (res, rej) => {
            try {
                const collection = db.collection(usercollection);
                collection.updateOne(filterQuery, { $set: updateObj }, function (err, result) {
                    // console.log("result", JSON.stringify(result))
                    try {
                        if (err) {
                            return rej(err)
                        }
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        return res(result.result)
                    } catch (error) {
                        return rej("Unable to Update the Document. Please check you Id")
                    }
                });
            } catch (e) {
                console.log("e", e)
                return rej("Someting Went wrong")
            }

        })
    },
    deleteDocument: function (filterQuery, db, client) {
        return new Promise(async (res, rej) => {
            try {

                filterQuery = comm.createQuery(filterQuery)
                const collection = db.collection(usercollection);
                collection.deleteOne(filterQuery, function (err, result) {
                    if (err) {
                        return rej(err)
                    }
                    try {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                    } catch (e) {
                        return rej("Unable to delete the Document. Please check you Id.")
                    }
                    return res(result);

                });
            } catch (e) {
                return rej("Unable to delete the Document. Please check you Id.")
            }
        })
    }
}