'use strict';

var express = require('express'),
    bodyparser = require('simple-bodyparser'),
    db = require('../models'),
    Log = db.Log;

var logRouter = express.Router();

logRouter.use(bodyparser());

logRouter.route('/')
    .get(function(req, res) {
        return Log.find(function(err, logs) {
            if (err) {
                return res.json(err);
            }
            return res.json(logs);
        });
    })
    .post(function(req, res) {
        var newlog,
            JSONobj;
        if (!req.is('json')) {
            return res.status(400).json({
                error: 'Type should be json'
            });
        }

        if (!req.body) {
            return res.status(400).json({
                error: 'Request cannot be empty'
            });
        }

        try {
            JSONobj = JSON.parse(req.body);
        } catch (e) {
            //console.log(e.message);
            return res.status(400).json({
                error: 'Invalid POST request.'
            });
        }

        delete JSONobj._id;

        newlog = new Log(JSONobj);
        newlog.save(function(err, log) {
            if (err) {
                //console.log(err);
                return res.status(400).json({
                    error: 'Invalid POST request.'
                });
            }
            res.location(log._id);
            return res.status(201).json(log);
        });
    });

logRouter.route('/:id')
    .get(function(req, res) {
        return Log.findById(req.params.id, function(err, log) {
            if (log) {
                return res.json(log);
            }
            if (err) {
                return res.json(err);
            }
            return res.status(404).json({
                error: 'Object doesn\'t exist'
            });
        });
    })
    .delete(function(req, res) {
        return Log.findById(req.params.id, function(err, log) {
            if (log) {
                return log.remove(function(err) {
                    if (err) {
                        res.json(err);
                    }
                    return res.status(204).end();
                });
            }

            if (!log) {
                if (err) {
                    return res.json(err);
                }
                return res.status(404).json({
                    error: 'Object doesn\'t exist'
                });
            }
        });
    });

module.exports = logRouter;