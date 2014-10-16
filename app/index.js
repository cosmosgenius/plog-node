"use strict";

var express         = require("express"),
    cors            = require("cors"),   
    logRouter       = require("./routes/log.route");


var app             = express();

app.use(cors());
app.use("/",logRouter);

module.exports = app;