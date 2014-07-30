'use strict';

var express = require('express'),
    db = require('../models'),
    Log = db.Log;

var logRouter = express.Router();

logRouter.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

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
            return res.json(400, {
                error: 'Type should be json'
            });
        }

        if (!req.rawBody) {
            return res.json(400, {
                error: 'Request cannot be empty'
            });
        }

        try {
            JSONobj = JSON.parse(req.rawBody);
        } catch (e) {
            //console.log(e.message);
            return res.json(400, {
                error: 'Invalid POST request.'
            });
        }

        delete JSONobj._id;

        newlog = new Log(JSONobj);
        newlog.save(function(err, log) {
            if (err) {
                //console.log(err);
                return res.json(400, {
                    error: 'Invalid POST request.'
                });
            }
            res.location(log._id);
            return res.json(201, log);
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
            return res.json(404, {
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
                    return res.send(204);
                });
            }

            if (!log) {
                if (err) {
                    return res.json(err);
                }
                return res.json(404, {
                    error: 'Object doesn\'t exist'
                });
            }
        });
    });

module.exports = logRouter;