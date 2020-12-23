const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// const url = 'mongodb://localhost:27017';
// const url="https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1804-4.4.2.tgz"
const url = `mongodb+srv://kulk:kulk@mycluster.1jk97.mongodb.net/esy?retryWrites=true&w=majority`


// Database Name
// user- kulk 
// pass-kulk
const dbName = 'esy';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  try {
    console.log("err", err)
    // assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    findDocuments(db, function () {
      client.close();
    });

  }
  catch (error) {
    console.log("insertDocuments -> error12")

  }
});



const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}


let esyObj = {
  "id": "esy-1608704883452",
  "createdDate": "2020-12-23T06:28:03.452Z",
  "modifiedDate": "2020-12-23T06:28:03.452Z",
  "expiryDate": "2020-12-30T06:28:03.452Z",
  "expiryTime": 1609309683452,
  "isDeleted": false,
  "siteVisitedCount": 0,
  "url": {
    "expiryInDays": 7,
    "customEnding": "xtzgr",
    "longUrl": "https://www.abc/dd",
    "shortUrl": "https://esyurl/xtzgr"
  }
}
const insertDocuments = function (db, callback) {
  try {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([esyObj], function (err, result) {
      // console.log("insertDocuments -> result", JSON.stringify(result))
      // assert.equal(err, null);
      assert.equal(3, result.result.n);
      // assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  } catch (error) {
    console.log("insertDocuments -> error")

  }

}