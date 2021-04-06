
let request = require("request")


request({
    "url": "http://3482a6e73e91.ngrok.io/esy",
    "method": "POST",
    "headers": {},
    "json": [
        {
            "longUrl": "www.f12.com"
        }
    ]
}, (err, resp, data) => {
console.log("resp", resp)
console.log("data", data)

})