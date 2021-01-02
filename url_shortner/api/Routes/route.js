

let controller = require("../controller/controller")
let config = require("../config")

let serverUrl = config.api.baseUrl.split(":/")[1]
console.log("serverUrl", serverUrl)

module.exports = function (app, db, client) {
    app.use(function (req, res, next) {
        req.headers["createdDate"] = new Date(Date.now()).toISOString()
        next()
    })
    app.route("/esy")
        .get(controller.list_all_urls(db, client))
        .post(controller.create_a_url(db, client))

    app.route("/esy/:esyID")
        .get(controller.get_a_url(db, client))
        .put(controller.update_a_url(db, client))
        .delete(controller.delete_a_url(db, client))

    app.route(`/:customEnding`)
        .get(controller.shortUrlListner(db, client))
}