/*jslint node: true */
var mongoose    = require('mongoose');
var config      = require('config');

mongoose.connect(config.mongouri);
module.exports = mongoose;
module.exports.Log = require('./Log');
module.exports.User = require('./User');