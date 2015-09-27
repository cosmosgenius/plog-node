'use strict';

let express = require('express');
let cors = require('cors');
let responseTime = require('response-time');
let app = express();

app.use(responseTime());
app.use(cors());

module.exports = app;
