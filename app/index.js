"use strict";

var express         = require("express"),
    cors            = require("cors"),   
    logRouter       = require("./routes/log"),
    userRouter      = require("./routes/user");

var app             = express();

app.use(cors());
app.use("/users", userRouter);
app.use("/",logRouter);

module.exports = app;