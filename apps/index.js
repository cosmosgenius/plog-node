'use strict';

let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors());

module.exports = app;
