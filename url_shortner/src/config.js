

module.exports = {
    "websiteUrl": "www.google.com",
    "baseUrl": "https://3c7b8daa2c00.ngrok.io",

    "api": {
        // "baseUrl": "https://www.esyurl.com/",
        "baseShortUrl": "https://3c7b8daa2c00.ngrok.io",
        // "baseUrl": "http://localhost:8080",
        "defaultExpiryDay": 1

    },
    "mongo": {
        "connectionURL": `mongodb+srv://kulk:kulk@mycluster.1jk97.mongodb.net/esy?retryWrites=true&w=majority`,
        "databaseName": 'esy',
        "collectionName": "documents"
    }
}