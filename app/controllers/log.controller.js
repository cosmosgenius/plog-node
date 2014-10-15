"use strict";
var config = require("config");
var Log = require("../models/log.model"),
    utils = require("../utils");

var pageLimit = config.pageLimit;

/**
 * Get the array of logs from db
 * @param  {number}   limit  The limit to apply when fetching from db (default: config.pageLimit)
 * @param  {number}   pageNo pagination value
 * @param  {Function} cb     callback function
 */
exports.getLogs = function getLogs (limit, pageNo, cb) {
    if(typeof limit === "function") {
        cb = limit;
        limit = pageLimit;
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
        if(!log) {
            return cb(utils.getErrorMessage(1404));
        }

        log.remove(function(err) {
            cb(err);
        });
    });
};

/**
 * Get a log with the given id value
 * @param  {string}   logid id of the log to be retrived
 * @param  {Function} cb    callback function called with the retrived log
 */
exports.getLog = function getLog(logid, cb) {
    Log.findById(logid, function (err, log) {
        if(!log) {
            return cb(utils.getErrorMessage(1404));
        }

        cb(null, {
            id: log._id,
            log: log.log,
            created_at: log.created_at
        });
    });
};