/*jslint node: true */
var mongoose    = require('mongoose');
var config      = require('config');

mongoose.connect(config.mongouri);
module.exports.Log = require('./Log');