


var randomstring = require("randomstring");

(async function () {
    try {
        let req = {
            "body": [
                {
                    "_id": "5fe5e6d5bdc0b43e927cd2a3",
                    "uid": "esy-1608902357706",
                    "createdDate": "2020-12-25T13:19:17.706Z",
                    "modifiedDate": "2020-12-25T13:19:17.706Z",
                    "expiryDate": "2021-01-01T13:19:17.706Z",
                    "expiryTime": 1609507157706,
                    "isDeleted": "false",
                    "siteVisitedCount": 0,
                    "url": {
                        "expiryInDays": 7,
                        "customEnding": "",
                        "longUrl": "https://sample.com/js",
                        "shortUrl": "https://esyurl/"
                    }
                }
            ]
        }


        for (i in req["body"]) {
            // console.log("====>", req["body"][i])
            let [customEnding, deleteArr] = await getCustomEnding()
            console.log("customEnding=====>", customEnding, deleteArr)
        }

    } catch (error) {
        console.log("error", error)
    }

}())


async function getCustomEnding(count = 0, len = 2) {
    return new Promise(async (res, rej) => {
        // let deleteArr = []
        try {
            let data = getRandomString(len)
            console.log("getCustomEnding -> data", data)
            let [doesExist, deleteArr] = await getDocument(data)
            if (doesExist) {
                if (count > 0) {
                    let [data, deleteArr] = await getCustomEnding(0, ++len)
                    return res([data, deleteArr])
                }
                let [data, deleteArr] = await getCustomEnding(++count, len)
                return res([data, deleteArr])
            } else {
                return res([data, deleteArr])
            }
        } catch (error) {
            return rej(error)
            // console.log("getCustomEnding -> error", error)
            // console.log("getCustomEnding -> error", error)
        }
    })
}



function getRandomString(len = 1) {
    return randomstring.generate({
        length: len,
        charset: "ab",
        capitalization: "lowercase"
    })
}


function getDocument(customEnding) {
    console.log("getDocument -> customEnding", customEnding)
    return new Promise((res, rej) => {
        let deleteArr = []
        let doesExist = false
        let data = [
            {
                "uid": "1",
                "customEnding": "a",
                "isDeleted": "true",
            },
            {
                "uid": "2",
                "customEnding": "b",
                "isDeleted": "true",

            },
            {
                "uid": "3",
                "customEnding": "aa",
                "isDeleted": "true",

            },
            {
                "uid": "4",
                "customEnding": "ab",
                "isDeleted": "false",

            },
            {
                "uid": "5",
                "customEnding": "ba",
                "isDeleted": "false",

            },
            {
                "uid": "5",
                "customEnding": "bb",
                "isDeleted": "true",
            },

        ]

        data.forEach(element => {
            if (element.customEnding == customEnding && element.isDeleted == "true") {
                deleteArr.push(element)
            }
            if (element.customEnding == customEnding && element.isDeleted == "false") {
                doesExist = true
            }
        });
        // let finalArr = data.filter(curr => curr["customEnding"] == customEnding)
        console.log("getDocument -> deleteArr", deleteArr)
        return res([doesExist, deleteArr])
    })
}