

let mongoComm = require("../mongdb/common")
let route = require("../Routes/route")
var app = require("express")()
var bodyParser = require('body-parser');
require('dotenv').config({ path: '../../../.env' })
const PORT = process.env.PORT || 8080
const REDIS_PORT = process.env.PORT || 8080


try {
    mongoComm.createMongoConnection().then(([db, client]) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        route(app, db, client)
        app.listen(PORT, () => {
        
            console.log("API server started on port: " + PORT)
        })

    }).catch((error) => {
        console.log("error", error)
    })

} catch (error) {
    console.log("error", error)
}
