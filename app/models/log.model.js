"use strict";
var mongoose = require("mongoose");

var LogSchema = new mongoose.Schema({
    log: {
        type: String,
        required: true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
});

var Log = mongoose.model("Log", LogSchema);

module.exports = Log;