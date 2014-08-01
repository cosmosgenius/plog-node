/*jslint node: true */
var mongoose = require('mongoose'),
    Types = mongoose.Schema.Types;

var logSchema = new mongoose.Schema({
    log: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Log', logSchema);