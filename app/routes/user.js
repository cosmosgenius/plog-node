"use strict";

var express = require("express"),
    db = require("../models"),
    User = db.User;

var userRouter = express.Router();

module.exports = userRouter;