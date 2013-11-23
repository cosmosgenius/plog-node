/*jslint node: true */
var config = {};


config.mongouri = 'mongodb://localhost:27017/plog';

config.port = 8000;

if (process.env.NODE_ENV === 'test') {
    config.mongouri = 'mongodb://localhost:27017/plog-test';
    config.port = 8500;
}

module.exports = config;