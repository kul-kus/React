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
    deleteDocument(db, function () {
      client.close();
    });

  }
  catch (error) {
    console.log("insertDocuments -> error12")

  }
});



const deleteDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.deleteOne({ uid: "esy-wqwq" }, function (err, result) {
    // assert.equal(err, null);
    // assert.equal(1, result.result.n);
    console.log("deleted -> result.result.n", result.result.n)
    console.log("deleted the document with the field a equal to 2");
    callback(result);
  });
}


const updateDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ uid: "esy-1608733124318" }
    , { $set: { isDeleted: 'false', siteVisitedCount: 0 } }, function (err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("updateDocument -> result.result.n", result.result.n)
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });
}


const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  // collection.
  db.collection('documents').createIndex(
    { "url.shortUrl": 1 },
    null,
    function (err, results) {
      console.log("findDocuments -> err", err)
      console.log("findDocuments -> results", results)
      collection.find({ $text: { $search: "wc" } }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
      });
      // console.log(results);
      // callback();
    }
  );
  // collection.cre
  // collection.find({ $text: { $search: "coffee" } }).toArray(function(err, docs) {
  //   assert.equal(err, null);
  //   console.log("Found the following records");
  //   console.log(docs);
  //   callback(docs);
  // });
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