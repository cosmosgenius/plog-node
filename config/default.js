/*jslint node: true */
var config          = {};

config.mongouri     = "mongodb://localhost:27017/plog";
config.port         = 8000;
config.env          = process.env.NODE_ENV || "development";
config.pageLimit    = 5;
module.exports      = config;