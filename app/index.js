"use strict";

var express         = require("express"),    
    logRouter       = require("./routes/log"),
    userRouter      = require("./routes/user");

var app             = express();


app.use("/users", userRouter);
app.use("/",logRouter);

module.exports = app;