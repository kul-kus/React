


try {


    var express = require("express")
    var app = express()

    bodyParser = require('body-parser');
    var router = express.Router()

    let port = 8080

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    // app.get('/installed:param', (req, res) => {
    //     res.redirect("https://www.facebook.com/")
    // });

    var myLogger = function (req, res, next) {
        // console.log("---->",req)
        req.requestTime = Date.now()
        req["name"]="kuldeep kushwaha"

        console.log('LOGGED')
        next()
      }
      
      app.use(myLogger)
      
    app.route('/installed/:param')
        .get(function (req, res) {
            console.log("---->",req.params)
            console.log("---->",req.requestTime)

        res.redirect("https://www.facebook.com/")

            // res.redirect('Get a random book')
        })
        .post(function (req, res) {
            res.send('Add a book')
        })
        .put(function (req, res) {
            res.send('Update the book')
        })

    app.listen(port, () => {
        console.log(" Api server started on port " + port)
    })
} catch (error) {
    console.log("error", error)

}