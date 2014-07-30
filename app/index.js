/*jslint node: true */
'use strict';

var express         = require('express'),
    mongoose        = require('mongoose'),
    logger          = require('morgan'),
    responseTime    = require('response-time'),
    logRouter       = require('./routes/log');

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

app.use('/',logRouter);

module.exports = app;