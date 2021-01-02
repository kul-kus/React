

const { t } = require('typy');
const _ = require("lodash")
const comm = require("./common")
const mongo = require("../mongdb/operations")


let configData = require("../config")
const defaultbaseUrl = configData.api.baseUrl
const defaultExpiryDay = configData.api.defaultExpiryDay


module.exports = {
    shortUrlListner: function (db, client) {
        return async function (req, resp) {
            console.log("------------------", req.params.customEnding)
            try {
                let updatedData = {}
                // let redirectUrl = configData.websiteUrl
                let siteRedirectUrl = "www.facebook.com"

                let data = await mongo.getDocument({ "url.customEnding": req["params"]["customEnding"] }, db, client)
                if (data && data.length == 1 && data[0]) {
                    updatedData = data[0]
                    console.log("updatedData", updatedData)
                    if (updatedData["isDeleted"] == "false" && updatedData["url"]["longUrl"]) {
                        siteRedirectUrl = updatedData["url"]["longUrl"]
                    }
                }
                console.log("siteRedirectUrl", siteRedirectUrl)

                resp.writeHead(301,
                    { Location: siteRedirectUrl }
                );
                resp.end();

                updatedData["siteVisitedCount"] = ++updatedData["siteVisitedCount"]
                let updatedDataResult = await mongo.updateDocument({ "uid": updatedData["uid"] }, updatedData, db, client)

            } catch (error) {
                console.log("error", error)
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to redirect."
                })
            }
        };
    },
    list_all_urls: function (db, client) {
        return async function (req, resp) {
            try {
                let record = await mongo.getDocument(req.query, db, client)
                return resp.status(200).json({ "shortUrl": record })
            } catch (error) {
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to list record."
                })
            }
        };
    },
    create_a_url: function (db, client) {
        return async function (req, resp) {
            try {
                let urlArr = []
                let deleteArr = []
                if (!comm.checkJson(req["body"])) {
                    return sendResp(resp, 500, {
                        "error": "Provide valid JSON body",
                        "Message": "Unable to create record."
                    })
                }
                req["body"] = comm.convertJson(req["body"])
                if (!Array.isArray(req["body"])) {
                    req["body"] = [req["body"]]
                }

                let deleteDocArr = await vaildationCheck(req, resp, db, client)

                //--------------- operations----------------------
                for (i in req["body"]) {
                    let curr = req["body"][i]
                    let urlObj = {
                        "uid": `esy-${getUid()}`,
                        "createdDate": req.headers.createdDate,
                        "modifiedDate": req.headers.createdDate,
                        "expiryDate": "",
                        "expiryTime": "",
                        "isDeleted": "false",
                        "siteVisitedCount": 0,
                        "url": {
                            "expiryInDays": "",// 5 days
                            "customEnding": "",
                            "longUrl": "",
                            "shortUrl": "",
                        }
                    }


                    urlObj["url"]["longUrl"] = t(curr, "longUrl").safeObject
                    urlObj["url"]["expiryInDays"] = defaultExpiryDay

                    urlObj["expiryDate"] = comm.getExpiryDate(urlObj)
                    urlObj["expiryTime"] = comm.getExpiryDate(urlObj, "miliSeconds")

                    if (t(curr, "customEnding").isDefined) {
                        let randomStr = t(curr, "customEnding").safeObject
                        urlObj["url"]["customEnding"] = randomStr
                        urlObj["url"]["shortUrl"] = `${defaultbaseUrl}/${randomStr}`
                    } else {
                        let [randomStr, deleteArr] = await self.getESYCustomEnding(db, client)
                        urlObj["url"]["customEnding"] = randomStr
                        urlObj["url"]["shortUrl"] = `${defaultbaseUrl}/${randomStr}`
                    }
                    urlArr.push(urlObj)
                }
                //---------------------------------------------
                deleteDocArr = _.concat(deleteDocArr, deleteArr)
                deleteDocArr = _.sortedUniq(deleteDocArr)
                deleteDocPromiseArr = deleteDocArr.map(curr => mongo.deleteDocument({ "uid": curr }, db, client))
                let delteDocu = await Promise.all(deleteDocPromiseArr)
                let record = await mongo.createDocument(urlArr, db, client)
                return resp.status(201).json({ "shortUrl": record })
            } catch (error) {
                console.log("error", error)
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to create record."
                })
            }
        }
    },
    get_a_url: function (db, client) {
        return async function (req, resp) {

            if (!t(req, "params.esyID").safeObject) {
                return sendResp(resp, 500, {
                    "error": "Please provide valid Id.",
                })
            }

            try {
                let record = await mongo.getDocument({ "uid": req["params"]["esyID"] }, db, client)
                return resp.status(200).json({ "shortUrl": record })
            } catch (error) {
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to get record."
                })
            }
        }
    },
    update_a_url: function (db, client) {
        return async function (req, resp) {
            if (!t(req, "params.esyID").safeObject) {
                return sendResp(resp, 500, {
                    "error": "Please provide valid Id.",
                })
            }
            if (req["body"] && Object.keys(req["body"]).length == 0) {
                return sendResp(resp, 400, {
                    "error": "Please provide valid body to update."
                })
            }
            try {
                let updatedData = await mongo.updateDocument({ "uid": req["params"]["esyID"] }, req["body"], db, client)
                // let record = await mongo.getDocument({ "uid": req["params"]["esyID"] }, db, client, true)
                return resp.status(200).json({ "Message": "Records Update Successfully." })
            } catch (error) {
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to update record."
                })
            }
        }
    },
    delete_a_url: function (db, client) {
        return async function (req, resp) {
            if (!t(req, "params.esyID").safeObject) {
                return sendResp(resp, 500, {
                    "error": "Please provide valid Id.",
                })
            }
            try {
                let deleteData = await mongo.deleteDocument({ "uid": req["params"]["esyID"] }, db, client)
                return resp.status(204).json({ "uid": req["params"]["esyID"] })
            } catch (error) {
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unable to delete record."
                })
            }
        }
    },
    getESYCustomEnding: function (db, client, count = 0, len = 5) {
        return new Promise(async (res, rej) => {
            try {
                let data = comm.getRandomString(len)
                let [doesExist, deleteArr] = await getDocument(db, client, data)
                if (doesExist) {
                    if (count > 0) {
                        let [data, deleteArr] = await self.getESYCustomEnding(db, client, 0, ++len)
                        return res([data, deleteArr])
                    }
                    let [data, deleteArr] = await self.getESYCustomEnding(db, client, ++count, len)
                    return res([data, deleteArr])
                } else {
                    return res([data, deleteArr])
                }
            } catch (error) {
                return rej(error)
            }
        })
    }
}

function getDocument(db, client, customEnding) {
    return new Promise(async (res, rej) => {
        let deleteArr = []
        let doesExist = false

        let data = await mongo.getDocument({ 'url.customEnding': customEnding }, db, client)
        data.forEach(element => {
            if (element["url"]["customEnding"] == customEnding && element["isDeleted"] == "true") {
                deleteArr.push(element["uid"])
            }
            if (element["url"]["customEnding"] == customEnding && element["isDeleted"] == "false") {
                doesExist = true
            }
        });
        return res([doesExist, deleteArr])
    })
}
function sendResp(resp, statusCode, obj) {
    return resp.status(statusCode).send(obj)
}

function vaildationCheck(req, resp, db, client) {
    let customEndingPromise = []
    let longUrlPromise = []
    let deleteDocPromiseArr, deleteDocArr = []

    return new Promise(async (res, rej) => {
        try {


            for (i in req["body"]) {

                let curr = req["body"][i]

                if (!t(curr, "longUrl").isDefined) {
                    return sendResp(resp, 400, { "error": `unable to find key 'longUrl' in body at index ${i}` })
                } else {
                    if (!comm.validateUrl(curr["longUrl"])) {
                        return sendResp(resp, 400, { "error": `Please provide vaild longUrl at index ${i}` })
                    }
                    longUrlPromise.push(mongo.getDocument({ 'url.longUrl': curr["longUrl"], "isDeleted": "true" }, db, client))
                }

                if (t(curr, "expiryInDays").isDefined && !t(curr, "expiryInDays").isNumber) {
                    return sendResp(resp, 400, { "error": "Key 'expiryInDays' shoud be in Numerical Format" })
                }
                if (t(curr, "customEnding").isDefined) {
                    if (!curr["customEnding"]) {
                        return sendResp(resp, 400, { "error": `Key 'customEnding' cannot be empty or null at index ${i}` })
                    }
                    if (!t(curr, "customEnding").isString) {
                        return sendResp(resp, 400, { "error": `Key 'customEnding' shoud be in String Format at index ${i}` })
                    }
                    customEndingPromise.push(mongo.getDocument({ 'url.customEnding': curr["customEnding"] }, db, client))

                }
            }

            let customEndingData = _.flattenDeep(await Promise.all(customEndingPromise))
            let longUrlData = _.flattenDeep(await Promise.all(longUrlPromise))


            if (customEndingData.length) {
                for (curr of customEndingData) {
                    if (curr.isDeleted == "true") {
                        deleteDocArr.push(curr["uid"])
                    } else {
                        return sendResp(resp, 400, { "error": `custom  ending '${curr["url"]["customEnding"]}' already in use` })
                    }
                }
            }

            if (longUrlData.length) {
                for (curr of longUrlData) {
                    deleteDocArr.push(curr["uid"])
                }
            }
            return res(deleteDocArr)
        } catch (error) {
            return rej(error)
        }
    })
    //----------------------- vaildation check-----------------------------

}
function getUid() {
    let id = Date.now() + comm.getRandomString(2, "numeric")
    return String(id)
}
var self = module.exports