


let mongoComm = require("../mongdb/common")
let mongoOperations = require("../mongdb/operations")
const expiryServerInterval = 86400000 //1 eDay in MilliSeconds

async function setExpiry() {
    try {
        let data = await setIsDeletedTrue()
        // console.log("data1- ", data)
        setInterval(async () => {
            let data = await setIsDeletedTrue()
            // console.log("data", data)
        }, expiryServerInterval)
    } catch (error) {
        console.log("Expiry server is facing Error: ", error)
    }
} setExpiry()


function setIsDeletedTrue() {
    return new Promise(async (res, rej) => {
        try {
            let updatePromiseArr = []
            let [db, client] = await mongoComm.createMongoConnection()
            let currentTime = Date.now()
            // console.log("setIsDeletedTrue -> currentTime", currentTime)
            let document = await mongoOperations.getDocument({ 'expiryTime': `lt ${currentTime}`, "isDeleted": "false" }, db, client)
            console.log("setIsDeletedTrue -> document", JSON.stringify(document))
            updatePromiseArr = document.map(curr => {
                return mongoOperations.updateDocument({ "uid": curr["uid"], "isDeleted": "false" }, { "isDeleted": "true" }, db, client)
            })
            let updatedData = await Promise.all(updatePromiseArr)
            console.log("setIsDeletedTrue -> updatedData", updatedData)
            client.close()
            return res(updatedData)
        } catch (error) {
            return rej(error)
        }

    })
}