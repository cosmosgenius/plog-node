"use strict";

var express = require("express"),
    bodyparser = require("simple-bodyparser"),
    jsonparser = require("jsonparser");

var logController = require("../controllers/log.controller");

var logRouter = express.Router();

logRouter.route("/")
    .get(function(req, res) {
        return logController.getLogs(function(err, logs) {
            return res.json(logs);
        });
    })
    .post(bodyparser())
    .post(jsonparser({
        strict: true,
        bodyCheck : true
    }))
    .post(function(req, res) {

        logController.createNewLog(req.json, function(err, log){
            if (err) {
                return res.status(400).json({
                    message: "Invalid POST request."
                });
            }
            res.location(log.id);
            return res.status(201).json(log);
        });

    })
    .all(function(err, req, res, next){
        if(err){
            res.status(err.status).json({
                message:err.message
            });
        }
        next();
    });

logRouter.route("/:id")
    .get(function(req, res) {
        logController.getLog(req.params.id, function(err, log) {
            if (log) {
                return res.json(log);
            }
            res
                .status(err.status)
                .json(err);
        });
    })
    .delete(function(req, res) {
        logController.deleteLog(req.params.id, function(err) {
            if(!err) {
                 return res.status(204).end();
            }

            res
                .status(err.status)
                .json(err);
        });
    });

module.exports = logRouter;