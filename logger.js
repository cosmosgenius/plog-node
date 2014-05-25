/*jslint node: true */

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'app.log' })
    ]
  });

module.exports = logger;