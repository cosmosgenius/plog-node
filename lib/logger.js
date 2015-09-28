'use strict';

let bunyan = require('bunyan');

function createLogger (name) {
    return bunyan.createLogger({
        name: name,
        serializers: bunyan.stdSerializers
    });
}

module.exports = {
    createLogger
};
