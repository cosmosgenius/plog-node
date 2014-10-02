"use strict";

module.exports = {
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
};