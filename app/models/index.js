"use strict";

var config      = require("config");
var manager     = require("./mongoose.manager");

manager.connect(config.mongouri);
module.exports = manager;
module.exports.Log = manager.createModel("Log",require("./log.model"));
module.exports.User = manager.createModel("User",require("./user.model"));