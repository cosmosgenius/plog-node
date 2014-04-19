/*jslint node: true */
var mongoose = require('mongoose');
var config  =   require('../instance/config');

mongoose.connect(config.mongouri);
module.exports.Log = require('./Log');