"use strict";
var Log = require("../models/log.model");

exports.getLogs = function getLogs (limit, pageNo, cb) {
    if(typeof limit === "function") {
        cb = limit;
        limit = 5;
    }
    
    pageNo = pageNo || 0;

    Log
        .find()
        .skip(pageNo*limit)
        .limit(limit)
        .exec(cb);
};

exports.createNewLog = function createNewLog(log, cb) {
    var newlog = new Log(log);
    newlog.save(function(err, log) {
        if(err) {
            return cb(err);
        }

        cb(null,{
            log: log.log,
            created_at: log.created_at
        });
    }); 
};