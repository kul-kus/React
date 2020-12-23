
var randomstring = require("randomstring");
const { t } = require('typy');

module.exports = {

    getRandomString: function (len = 5, charset = "alphabetic") {
        return randomstring.generate({
            length: len,
            charset: charset,
            capitalization: "lowercase"
        })
    },
    getExpiryDate: function (obj, exdateType = "ISOString") {
        let createdMiliSeconds = self.getCurrentTimeInMili()
        if (t(obj, "createdDate").safeObject) {
            createdMiliSeconds = (self.convertToMiliSec(obj["createdDate"]))
        }
        let expiryMiliSeconds = obj["url"]["expiryInDays"] * (86400 * 1000)
        let deleteMiliSeconds = Number(createdMiliSeconds) + Number(expiryMiliSeconds)
        if (exdateType == "miliSeconds") {
            return deleteMiliSeconds
        }
        return self.convertToISO(deleteMiliSeconds)
    },
    getCurrentTimeInMili: function () {
        return Date.now()
    },
    getCurrentTimeInISO: function () {
        return new Date(Date.now()).toISOString()
    },
    convertToISO: function (miliseec) {
        try {
            return new Date(miliseec).toISOString()
        } catch (error) {
            return miliseec
        }
    },
    convertToMiliSec: function (dateTime) {
        try {
            return new Date(dateTime).getTime()
        } catch (error) {
            return dateTime
        }
    },
    validateUrl: function (url) {
        let urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
        if (!urlRegex.test(url)) {
            return false
        }
        return true
    }
}
var self = module.exports

