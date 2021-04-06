
const config = require("../../config")
// const { getCache, setCache, clearCache } = require("./../controller/cache")
// let baseURL = "http://3482a6e73e91.ngrok.io"

let baseURL = config.baseUrl
module.exports = {
    "createShortUrl": async function (formdataObj, cb) {
        try {
            let data = {
                "longUrl": formdataObj["url"]
            }
            if (formdataObj && formdataObj.custom) {
                data["customEnding"] = formdataObj["custom"]

            }
            if (formdataObj && formdataObj.days) {
                data["expiryInDays"] = formdataObj["days"]
            }
            let createObj = {
                url: `${baseURL}/esy`,
                method: "POST",
                // "mode": 'no-cors',
                headers: {
                    // "Access-Control-Allow-Origin": "*"
                },
                json: [data]
            }

            let shortURLData
            // shortURLData = await self.dummyCallRequest(createObj)
            console.log("createObj=============>", JSON.stringify(createObj))
            shortURLData = await self.makeApiCallRequest(createObj)
            console.log("shortURLData============>", shortURLData)


            if (shortURLData && shortURLData.shortUrl && Array.isArray(shortURLData.shortUrl) && shortURLData.shortUrl.length) {
                let finalData = shortURLData.shortUrl[0]
                if (finalData && finalData.url && finalData.url.shortUrl) {
                    alert(finalData.url.shortUrl + "----")
                    console.log("finalData.url.shortUrl", finalData.url.shortUrl)
                    return cb(null, { "longurl": formdataObj["url"], "shorturl": finalData.url.shortUrl })
                }
            } else {
                let customErr = "Something went wrong in fetching response."
                return cb(customErr)
            }


        } catch (error) {
            console.log("error-------->", error)
            return cb(error)
        }
    },


    checkJson: function (str) {
        try {
            str = (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            return false;
        }
        return true;
    },
    convertJson: function (str) {
        try {
            str = (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            return str;
        }
        return str;
    },

    makeApiCallRequest: function (options_par, method, url, qs) {

        let request = require("request")
        let temp_param = {}
        if (!options_par) {
            temp_param = {
                method: method,
                url: url,
                qs: qs,
                headers: {
                }
            }
        }
        let params = (options_par) ? (options_par) : (temp_param)
        params["timeout"] = 90000
        return new Promise((resolve, reject) => {

            request(params, function (error, response, body) {
                alert("error" + error + JSON.stringify(error))
                alert("response" + response)
                alert("body" + body)
                if (error) {
                    if (typeof error === "object" && Object.keys(error).length === 0) {
                        return reject("Fail to fetch Short URL")
                    }
                    return reject(JSON.stringify(error))
                }
                if (!response) {
                    return reject("Something went wrong. Unable to fetch response.")
                }

                if (self.checkJson(body)) {
                    body = self.convertJson(body)
                }
                if (response.statusCode >= 200 && response.statusCode < 400) {
                    console.log("body--->", body)
                    return resolve(body)
                }
                else {
                    return reject(body)
                }
            })
        })
    },
    dummyCallRequest: function () {
        // return "ffff"
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // return reject("error from set timeout")
                return resolve({
                    "shortUrl": [
                        {
                            "_id": "5ffd7a0508385e4686dcfb0a",
                            "uid": "esy-161044736529232",
                            "createdDate": "2021-01-12T10:29:23.980Z",
                            "modifiedDate": "2021-01-12T10:29:23.980Z",
                            "expiryDate": "2021-01-19T10:29:23.980Z",
                            "expiryTime": 1611052163980,
                            "isDeleted": "false",
                            "siteVisitedCount": 0,
                            "url": {
                                "expiryInDays": 7,
                                "customEnding": "teknv",
                                "longUrl": "https://www.npmjs.com/",
                                "shortUrl": "http://tep123.com"
                            }
                        }
                    ]
                })
            }, 1000)
        })
    },

}


var self = module.exports


// function alert(srt){
// console.log("alert ->", srt)
// }
// self.createShortUrl({
//     "url": "https://web.whatsapp.com/"
// }, (err, data) => {
//     console.log("data", data)
//     console.log("err", err)

// })


