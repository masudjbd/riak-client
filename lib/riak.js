var async = require('async');
var logger = require('winston');
var uuid = require('node-uuid');
var assert = require('assert');
var config = require('./../config');
var Riak = require('basho-riak-client');

//initiate client
var client = new Riak.Client(config.riakNodes);

// Ping and check riak is running or not
client.ping(function (err, rslt) {
    if (err) {
        throw new Error(err);
    } else {
        // On success, ping returns true
        assert(rslt === true);
        logger.log("Riak running and connected successfully ... ");
    }
});


//Create
exports.save = function(metaObj, data, callback ) {
     //if key is not set
    if(metaObj.key == null || metaObj.key === undefined){
        metaObj.key=uuid();
    }
    var storeFuncs = [];
         // Create functions to execute in parallel to store people
        storeFuncs.push(function (async_cb) {
            client.storeValue({
                    bucketType: metaObj.bucketType,
                    bucket: metaObj.bucket,
                    key: metaObj.key,
                    value: data
                },
                function(err, rslt) {
                    async_cb(err, rslt);
                }
            );
        });
    if(callback){
        return callback("Successfully saved object.")
    }else{
        logger.log("Successfully saved object.... ");
    }
     async.parallel(storeFuncs, function (err, rslts) {
        if (err) {
            throw new Error(err);
        }
    });
}

//Read
exports.get = function( metaObj, callback) {
    client.fetchValue({ bucketType: metaObj.bucketType, bucket: metaObj.bucket, key: metaObj.key, convertToJs: true },
        function (err, rslt) {
            if (err) {
                if (err) return callback(err, []);
                throw new Error(err);
            } else {
                var riakObj = rslt.values.shift();
                if(callback){
                    return callback(riakObj);
                }else {
                    return riakObj;
                }
             }
        }
    );
}

//Update
exports.update = function(metaObj, data, callback){
    client.storeValue({ value: data }, function (err, rslt) {
        if (err) {
            throw new Error(err);
        }else{
            if(callback){
                return callback("Successfully updated object.")
            }else{
                logger.log("Successfully updated object.... ");
            }
        }
    });
}

//Delete
exports.delete = function(metaObj, callback) {
    client.deleteValue({bucketType: metaObj.bucketType, bucket: metaObj.bucket, key: metaObj.key}, function (err, rslt) {
        if (err) {
            throw new Error(err);
        } else {
            if(callback){
                return callback("data deleted successfully.");
            }else {
                logger.log("data deleted successfully.");
            }
        }
    });
}
