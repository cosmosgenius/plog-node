"use strict";

module.exports = {
    log: {
        type: String,
        required: true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
};