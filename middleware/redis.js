/**
 * @module       Helper
 * @file         helper.js
 * @description  To send data to user using redis DB
 * @author       Sanyukta 
**************************************************************/

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);

class RedisClass {
    /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
    checkCache(req, res, next) {
        const  getNotes  = req.params;
        client.get("notes", (error, data) => {
            if(error) console.log(error);
            if(data !== null) {
                data = JSON.parse(data);
                console.log(data)
                res.send({success: true, message: "Notes Retrieved!", data: data});
            }else {
                next();
            }
        });
    }

    checkCacheId(req, res, next) {
        //const  getNotes  = req.params;
        client.get("notes", (error, data) => {
            if(error) console.log(error);
            if(data !== null) {
                data = JSON.parse(data);
                // console.log(data)
                res.send({success: true, message: "Notes Retrieved!", data: data});
            }else {
                next();
            }
        });
    }

    /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
     checkLabelCache(req, res, next) {
        // const  lableId  = req.params;
        client.get("lableId", (error, data) => {
            if(error) 
            // console.log('error occured', error);
            if(data !== null) {
                data = JSON.parse(data);
                res.send({success: true, message: "Labels Retrieved!", data: data});
            }else {
                next();
            }
        });
    }

    /**
     * @description setting data to key into redis
     * @param userId
     * @param data
     */
    setDataInCache(key, time, value) {
        client.SETEX(key, time, value);
    }

    
    /**
     * @description clearing cache
     */
    clearCache() {
        client.flushall();
        console.log('Cache is cleared!')
    }

   async  clearCache (key) {
   return await client.del(key);
  };
}

module.exports = new RedisClass();