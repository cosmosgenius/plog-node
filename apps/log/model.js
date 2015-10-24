'use strict';

let mongoose = require('mongoose');

let logSchema = mongoose.Schema({
    text: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    source: String
});

let Log = mongoose.model('Log', logSchema);

module.exports = Log;
