"use strict";
var mongoose    = require("mongoose");
var config      = require("config");

mongoose.connect(config.mongouri);

module.exports = mongoose;

require("./log.model");
require("./user.model");

module.exports.Log = mongoose.model("Log");
module.exports.User = mongoose.model("User");