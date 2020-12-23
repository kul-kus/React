

const { t } = require('typy');
const comm = require("./common")
const mongo = require("./../mongdb/createDoucment")


let configData = require("../config")
const defaultbaseUrl = configData.api.baseUrl
const defaultExpiryDay = configData.api.defaultExpiryDay


module.exports = {
    list_all_urls: function (db, client) {
        return function (req, resp) {
            console.log("-----aayayaya----", datasample)
            // console.log("req", req.headers.createdDate)

            return resp.status(200).json({
                "message": "All URLS",
                "date": req.headers.createdDate,
                "data": datasample
            })
        };

    },
    create_a_url: function (db, client) {
        // console.log("tempVar", tempVar)
        return async function (req, resp) {
            try {
                let urlArr = []

                if (!Array.isArray(req["body"])) {
                    req["body"] = [req["body"]]
                }

                urlArr = req["body"].map((curr, index) => {
                    let urlObj = {
                        "uid": `esy-${Date.now()}`,
                        "createdDate": req.headers.createdDate,
                        "modifiedDate": req.headers.createdDate,
                        "expiryDate": "",
                        "expiryTime": "",
                        "isDeleted": false,
                        "siteVisitedCount": 0,
                        "url": {
                            "expiryInDays": "",// 5 days
                            "customEnding": "",
                            "longUrl": "",
                            "shortUrl": "",
                        }
                    }

                    if (!t(curr, "longUrl").isDefined) {
                        return sendResp(resp, 400, { "error": `unable to find key 'longUrl' in body at index ${index}` })
                    } else {
                        if (!comm.validateUrl(curr["longUrl"])) {
                            return sendResp(resp, 400, { "error": `Please provide vaild longUrl at index ${index}` })
                        }
                        urlObj["url"]["longUrl"] = t(curr, "longUrl").safeObject
                    }

                    if (t(curr, "expiryInDays").isDefined && !t(curr, "expiryInDays").isNumber) {
                        return sendResp(resp, 400, { "error": "Key 'expiryInDays' shoud be in Numerical Format" })
                    } else {
                        urlObj["url"]["expiryInDays"] = defaultExpiryDay
                    }

                    urlObj["expiryDate"] = comm.getExpiryDate(urlObj)
                    urlObj["expiryTime"] = comm.getExpiryDate(urlObj, "miliSeconds")


                    if (t(curr, "customEnding").isDefined) {
                        if (!curr["customEnding"]) {
                            return sendResp(resp, 400, { "error": `Key 'customEnding' cannot be empty or null at index ${index}` })
                        }
                        if (!t(curr, "customEnding").isString) {
                            return sendResp(resp, 400, { "error": `Key 'customEnding' shoud be in String Format at index ${index}` })
                        }
                        let randomStr = t(curr, "customEnding").safeObject
                        urlObj["url"]["customEnding"] = randomStr
                        urlObj["url"]["shortUrl"] = `${defaultbaseUrl}${randomStr}`
                    } else {
                        let randomStr = comm.getRandomString()
                        urlObj["url"]["customEnding"] = randomStr
                        urlObj["url"]["shortUrl"] = `${defaultbaseUrl}${randomStr}`
                    }
                    return urlObj
                })
                let record = await mongo.createDocument(urlArr, db, client)
                return resp.status(201).json({ "shortUrl": record })
            } catch (error) {
                return sendResp(resp, 500, {
                    "error": error,
                    "Message": "Unbable to create record."
                })
            }
        }
    },
    read_a_url: function (db, client) {
        return async function (req, resp) {
            resp.json({
                "message": "get_a_url"
            })
        }
    },
    update_a_url: function (db, client) {
        return async function (req, resp) {
            resp.json({
                "message": "update_a_url"
            })
        }
    },
    delete_a_url: function (db, client) {
        return async function (req, resp) {
            resp.json({
                "message": "delete_a_url"
            })
        }
    },
}


function sendResp(resp, statusCode, obj) {
    return resp.status(statusCode).send(obj)
}
var self = module.exports