/*jslint node: true */
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    plog: String
});

module.exports = mongoose.model('Log', logSchema);