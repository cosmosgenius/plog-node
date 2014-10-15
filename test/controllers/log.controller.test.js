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
                    Log.find(function(err, logs){
                        logs.length.should.be.eql(1);
                        logs[0].should.have.properties(testData[0]);
                        logs[0].should.have.property("created_at");
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

    describe("getLogs function", function() {
        before(cleardb);

        it("should return zero logs", function(done) {
            logController.getLogs(function(err, logs){
                logs.length.should.be.eql(0);
                done(err);
            });
        });

        it("should return " + config.pageLimit + " logs", function(done){
            done();
        });
    });
});