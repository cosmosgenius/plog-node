/*jslint node: true */
'use strict';

var express         = require('express'),
    mongoose        = require('mongoose'),
    logger          = require('morgan'),
    responseTime    = require('response-time'),
    logRouter       = require('./routes').logRouter;

var app             = express(),
    env             = process.env.NODE_ENV || 'development';

if('production' === env) {
    app.use(logger());
}

if('development' === env) {
    mongoose.set('debug', true);
    app.use(logger('dev'));
    app.use(responseTime());
}

app.use('/plog',logRouter);

module.exports = app;