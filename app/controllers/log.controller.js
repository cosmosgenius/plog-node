"use strict";
var Log = require("../models/log.model"),
    utils = require("../utils");

/**
 * Get the array of logs from db
 * @param  {number}   limit  The limit to apply when fetching from db (default: config.pageLimit)
 * @param  {number}   pageNo pagination value
 * @param  {Function} cb     callback function
 */
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

/**
 * Create a new log
 * @param  {object}   log An object with log string
 * @param  {Function} cb  callback function called with the newly create log
 */
exports.createNewLog = function createNewLog(log, cb) {
    var newlog = new Log(log);
    newlog.save(function(err, log) {
        if(err) {
            return cb(err);
        }

        cb(null,{
            id: log._id,
            log: log.log,
            created_at: log.created_at
        });
    }); 
};

/**
 * Delete the log with the given id
 * @param  {string}   logid id of the log to be deleted
 * @param  {Function} cb    callback function
 */
exports.deleteLog = function deleteLog(logid, cb) {
    Log.findById(logid, function (err, log) {

    });
};

/**
 * Get a log with the given id value
 * @param  {string}   logid id of the log to be retrived
 * @param  {Function} cb    callback function called with the retrived log
 */
exports.getLog = function getLog(logid, cb) {
    Log.findById(logid, function (err, log) {
        var ret;

        if(log) {
            ret = {
                id: log._id,
                log: log.log,
                created_at: log.created_at
            };
        } else {
            ret = utils.getErrorMessage(404);
        }

        return cb(null,ret);
    });
};