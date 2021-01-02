


let mongoComm = require("../mongdb/common")
let mongoOperations = require("../mongdb/operations")




setInterval(async () => {
    let updatePromiseArr = []
    let [db, client] = await mongoComm.createMongoConnection()
    let document = await mongoOperations.getDocument({ 'expiryTime': `lt ${Date.now()}`, "isDeleted": "false" }, db, client)
    updatePromiseArr = document.map(curr => {
        return mongoOperations.updateDocument({ "uid": curr["uid"] }, { "isDeleted": "true" }, db, client)
    })
    let updatedData = await Promise.all(updatePromiseArr)
    // console.log("document", document)
}, 200)