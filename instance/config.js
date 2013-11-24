/*jslint node: true */
var config = {};


config.mongouri = 'mongodb://localhost:27017/plog';

config.port = 8000;
config.env = process.env.NODE_ENV || 'development';

if (config.env === 'test') {
    config.mongouri = 'mongodb://localhost:27017/plog-test';
    config.port = 8500;
}

module.exports = config;