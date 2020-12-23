

module.exports = {
    "api": {
        "baseUrl": "https://esyurl/",
        "defaultExpiryDay": 7

    },
    "mongo": {
        "connectionURL": `mongodb+srv://kulk:kulk@mycluster.1jk97.mongodb.net/esy?retryWrites=true&w=majority`,
        "databaseName": 'esy',
        "collectionName":"documents"
    }
}