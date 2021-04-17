

let con = require("../controller/controller")
let cache = require("../controller/cache")

let config = require("../../config")

let serverUrl = config.baseUrl.split(":/")[1]
console.log("serverUrl", serverUrl)

module.exports = function (app, db, client) {
    // console.log("------------------app-----", app.headers)
    app.use(function (req, res, next) {
        req.headers["createdDate"] = new Date(Date.now()).toISOString()
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next()
    })
    app.route("/esy")
        .get(con.list_all_urls(db, client))
        .post(con.create_a_url(db, client))

    app.route("/esy/:esyID")
        .get(con.getCache(), con.get_a_url(db, client))
        .put(con.update_a_url(db, client))
        .delete(con.delete_a_url(db, client))

    app.route(`/:customEnding`)
        .get(con.getCache(), con.shortUrlListner(db, client))
}
