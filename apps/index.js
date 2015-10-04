'use strict';

let express = require('express');
let cors = require('cors');
let log = require('../lib/logger').createLogger('apps');
let app = express();

app.use(cors());

module.exports = app;
