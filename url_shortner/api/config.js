

module.exports = {
    "websiteUrl": "www.google.com",
    "api": {
        // "baseUrl": "https://esyurl/",
        "baseUrl": "https://31467d1606b4.ngrok.io",
        "defaultExpiryDay": 7

    },
    "mongo": {
        "connectionURL": `mongodb+srv://kulk:kulk@mycluster.1jk97.mongodb.net/esy?retryWrites=true&w=majority`,
        "databaseName": 'esy',
        "collectionName": "documents"
    }
}