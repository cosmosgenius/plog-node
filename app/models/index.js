"use strict";
var mongoose    = require("mongoose");
var config      = require("config");

mongoose.connect(config.mongouri);

module.exports = mongoose;

require("./log.model");

module.exports.Log = mongoose.model("Log");