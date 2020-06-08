var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var newDoc;
MongoClient.connect(url, function(err, db1) {
  if (err) throw err;
  var dbo = db1.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");

    newDoc = {'firstName':'kul','lastName':'kushwaha'};
    dbo.collection('customers').insert(newDoc,function(err,data){
      if (err) throw err;
      console.log("insertted");
    })

    db1.close();
  });
 
}); 
