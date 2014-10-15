/*global describe, it, before */
"use strict";
var config = require("config"),
    should = require("should");

var Log             = require("../../app/models").Log,
    logController   = require("../../app/controllers/log.controller"),
    testData        = require("../testData");

function cleardb(done) {
    Log.remove(function() {
        done();
    });
}

describe("Log Controller", function() {

    describe("createNewLog function",function() {
        before(cleardb);        
        it("should create new log", function(done){
            Log.find(function(err, logs){
                logs.length.should.be.eql(0);

                logController.createNewLog(testData[0],function(err, log){
                    log.should.have.properties(testData[0]);
                    log.should.have.property("created_at");
                    log.should.have.property("id");
                    Log.find(function(err, logs){
                        logs.length.should.be.eql(1);
                        logs[0].should.have.properties(testData[0]);
                        logs[0].should.have.property("created_at");
                        logs[0].should.have.property("id");
                        done();
                    });
                });
            });
        });

        it("should send validation error in callback if log property not present", function(done){
            logController.createNewLog({
                p:"p"
            }, function(err, log){
                should.exist(err);
                should.not.exist(log);
                done();
            });
        });
    });

    describe("getLog function", function() {
        before(cleardb);
        it("should get the log present at the id", function(done) {
            logController.createNewLog(testData[0],function(err, log){
                should.exist(log);

                logController.getLog(log.id, function(err, innerlog){
                    innerlog.log.should.be.eql(log.log);
                    done(err);
                });
            });
        });

        it("should return error 1404 if id not present", function(done){
            logController.getLog("52892747ad2582d024000004", function(err, log){
                should.not.exist(log);
                should.exist(err);
                err.errorCode.should.be.eql(1404);
                done();
            });
        });
    });

    describe("deleteLog function", function() {
        var del_id;
        before(cleardb);

        it("should delete the log present at the id", function(done) {
            logController.createNewLog(testData[0],function(err, log){
                should.exist(log);
                del_id = log.id;
                logController.deleteLog(del_id, done);
            });
        });

        it("should return error 1404 if id not present", function(done) {
            logController.deleteLog(del_id, function(err) {
                should.exist(err);
                err.errorCode.should.be.eql(1404);
                done();
            });
        });
    });

    describe("getLogs function", function() {
        before(cleardb);

        it("should return zero logs", function(done) {
            logController.getLogs(function(err, logs){
                logs.length.should.be.eql(0);
                done(err);
            });
        });

        it("should return " + config.pageLimit + " logs");
    });
});