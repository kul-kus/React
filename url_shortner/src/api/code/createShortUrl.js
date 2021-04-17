
const config = require("../../config")
const comm= require("./../common")
// const { getCache, setCache, clearCache } = require("./../controller/cache")
// let baseURL = "http://3482a6e73e91.ngrok.io"

let baseURL = config.baseUrl
module.exports = {
    "createShortUrl": async function (formdataObj, cb) {
        // let customErr = "Something went wrong in fetching response hehe."
        // return cb(customErr)
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
                headers: {},
                json: [data]
            }

            let shortURLData
            // shortURLData = await comm.dummyCallRequest(createObj)
            shortURLData = await comm.makeApiCallRequest(createObj)


            if (shortURLData && shortURLData.shortUrl && Array.isArray(shortURLData.shortUrl) && shortURLData.shortUrl.length) {
                let finalData = shortURLData.shortUrl[0]
                if (finalData && finalData.url && finalData.url.shortUrl && finalData.url.expiryInDays) {
                    return cb(null, {
                        "longurl": finalData["url"]["longUrl"],
                        "shorturl": finalData["url"]["shortUrl"],
                        "expiryInDays": finalData["url"]["expiryInDays"],
                        "customEnding": finalData["url"]["customEnding"],
                    })
                }
                let customErr = "Something went wrong in fetching response."
                return cb(customErr)
            } else {
                let customErr = "Something went wrong in fetching response."
                return cb(customErr)
            }


        } catch (error) {
            return cb(error)
        }
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


