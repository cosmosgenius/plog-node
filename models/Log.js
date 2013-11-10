/*jslint node: true */
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    log: String
});

module.exports = mongoose.model('Log', logSchema);