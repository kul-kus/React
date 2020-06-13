

module.exports = {
    "createShortUrl": function (formdataObj, cb) {
        alert("- submitted ---> " + JSON.stringify(formdataObj))
        return cb(null,true)
    }
}