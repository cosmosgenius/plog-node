/*jslint node: true */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('User', userSchema);