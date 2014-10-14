"use strict";
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    modified_at : {
        type : Date,
        default : Date.now
    }
});

mongoose.model("User", UserSchema);