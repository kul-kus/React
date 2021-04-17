


const expiryServerInterval = 86400000 //1 eDay in MilliSeconds
// const expiryServerInterval = 5000 //1 eDay in MilliSeconds/


const config = require("../../config")
const comm = require("./../common")

let baseURL = config.baseUrl
async function setExpiry() {
    try {
        let data = await setIsDeletedTrue()
        setInterval(async () => {
            let data = await setIsDeletedTrue()
        }, expiryServerInterval)

    } catch (error) {
        console.log("Expiry server is facing Error: ", error)
    }
} setExpiry()


function setIsDeletedTrue() {
    return new Promise(async (res, rej) => {
        try {
            let currentTime = Date.now()
            let qs = { 'expiryTime': `lt ${currentTime}`, "isDeleted": "false" }
            let shortURLData = await comm.makeApiCallRequest(null, "GET", `${baseURL}/esy`, qs)
            if (shortURLData && shortURLData.shortUrl && Array.isArray(shortURLData.shortUrl) && shortURLData.shortUrl.length > 0) {
                let updatePromiseArr = shortURLData.shortUrl.map(curr => {
                    let cloneObj = JSON.parse(JSON.stringify(curr))
                    let updateOtp = {
                        "method": "PUT",
                        "url": `${baseURL}/esy/${curr["uid"]}`,
                        json: makeUpdateObj(cloneObj)
                    }
                    return comm.makeApiCallRequest(updateOtp)
                })

                let updatedData = await Promise.all(updatePromiseArr)
                return res(updatedData)
            }
            return res([])
        } catch (error) {
            return rej(error)
        }
    })
}



function makeUpdateObj(obj) {
    if (obj.hasOwnProperty("_id")) {
        delete obj["_id"]
    }
    if (obj.hasOwnProperty("isDeleted")) {
        obj["isDeleted"] = "true"
    }
    if (obj.hasOwnProperty("modifiedDate")) {
        obj["modifiedDate"] = new Date(Date.now()).toISOString()
    }
    return obj
}