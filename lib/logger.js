'use strict';

let bunyan = require('bunyan');

function createLogger (name) {
    return bunyan.createLogger({
        name: name,
        serializers: {
            err: bunyan.stdSerializers.err
        }
    });
}

module.exports = {
    createLogger
};
