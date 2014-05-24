/*jslint node: true */
'use strict';

var express         = require('express'),
    mongoose        = require('mongoose'),
    responseTime    = require('response-time'),
    logRouter       = require('./routes').logRouter;

var app             = express(),
    env             = process.env.NODE_ENV || 'development';

if('production' === env) {
    app.use(function(req, res, next){
        next();
    });
}

if('development' === env) {
    mongoose.set('debug', true);
    app.use(function(req, res, next){
        next();
    });
    app.use(responseTime());
}

app.use('/',logRouter);

module.exports = app;