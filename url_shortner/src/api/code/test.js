const redis = require('async-redis');
const client = redis.createClient(6379);
require('dotenv').config()
const port = process.env.PORT
console.log("port", port)

client.on("error", function (err) {
  console.log("Error " + err);
});


// console.log("-------", PORT)
// const asyncBlock = async () => {
//   await client.set("string key", "string val");
//   const value = await client.get("string key");
//   console.log("-------", value);
//   await client.flushall("string key");
//   console.log("-------", value);

// };
// asyncBlock()