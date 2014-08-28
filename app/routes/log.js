'use strict';

var express = require('express'),
    bodyparser = require('simple-bodyparser'),
    jsonparser = require('jsonparser'),
    db = require('../models'),
    Log = db.Log;

var logRouter = express.Router();

logRouter.route('/')
    .get(function(req, res) {
        return Log.find(function(err, logs) {
            return res.json(logs);
        });
    })
    .post(bodyparser())
    .post(jsonparser({
        strict: true,
        bodyCheck : true
    }))
    .post(function(req, res) {
        var newlog,
            JSONobj;

        JSONobj = req.json;
       
        delete JSONobj._id;

        newlog = new Log(JSONobj);
        newlog.save(function(err, log) {
            if (err) {
                //console.log(err);
                return res.status(400).json({
                    message: 'Invalid POST request.'
                });
            }
            res.location(log._id);
            return res.status(201).json(log);
        });
    })
    .all(function(err, req, res, next){
        if(err){
            res.status(err.status).json({
                message:err.message
            });
        }
        next();
    });

logRouter.route('/:id')
    .get(function(req, res) {
        return Log.findById(req.params.id, function(err, log) {
            if (log) {
                return res.json(log);
            }
            return res.status(404).json({
                message: 'Object doesn\'t exist'
            });
        });
    })
    .delete(function(req, res) {
        return Log.findById(req.params.id, function(err, log) {
            if (log) {
                return log.remove(function() {
                    return res.status(204).end();
                });
            }
            if (!log) {
                return res.status(404).json({
                    message: 'Object doesn\'t exist'
                });
            }
        });
    });

module.exports = logRouter;