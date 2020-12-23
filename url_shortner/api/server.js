

let mongoComm = require("./mongdb/common")
let route = require("./Routes/route")
var app = require("express")()
var bodyParser = require('body-parser');
const port = 8080

try {
    mongoComm.createMongoConnection().then(([db, client]) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        route(app, db, client)
        app.listen(port, () => {
            console.log("API server started on port: " + port)
        })

    }).catch((error) => {
        console.log("error", error)
    })

} catch (error) {
    console.log("error", error)
}
