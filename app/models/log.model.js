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

mongoose.model("Log", LogSchema);