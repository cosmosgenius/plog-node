'use strict';

let express = require('express');
let log = require('../../lib/logger').createLogger('logapp');
let logapp = express.Router();

let logmodel = require('./model');

logapp.get('/', (res, req) => {
    req.json({
        hello:'hello'
    });
});

module.exports = logapp;
