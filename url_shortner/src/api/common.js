
module.exports = {

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
            }, 5000)
        })
    },
}

var self = module.exports