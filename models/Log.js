/*jslint node: true */
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    plog: { type: String, required: true }
});

module.exports = mongoose.model('Log', logSchema);