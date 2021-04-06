
const redis = require('async-redis');

const client = redis.createClient();

const expirationTime = 120; //second

require('dotenv').config({ path: '../../../.env' })
const PORT = process.env.PORT || 8080
const REDIS_PORT = process.env.PORT || 8080


async function setCache(key, data){
    return await set(key,JSON.stringify(data))
}

async function set(key, data){
     await client.setex(key,expirationTime, data);
}

async function getCache(key){
    var data = await get(key);
    return JSON.parse(data);
}

async function get(key) {
     return await client.get(key);
}

async function clearCache(key){
    return await clear(key);
}

async function clear(key){
      return  await client.del(key);
}

module.exports.getCache = getCache
module.exports.setCache = setCache
module.exports.clearCache = clearCache

