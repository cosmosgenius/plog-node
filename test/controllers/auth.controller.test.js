/*jshint expr: true*/
/*global describe, it, before */
"use strict";

var authController   = require("../../app/controllers/auth.controller");

describe("Auth Controller", function(){
    describe("isAuthorized function", function(){
        before(function(){
            process.env.ACCESS_TOKEN = "5TVEDN34KSU1nsQEf8l5I4X0e981d749";
        });
        it("should return true for valid auth token",function(){
            authController
                .isAuthorized("5TVEDN34KSU1nsQEf8l5I4X0e981d749")
                .should.be.true;
        });
        it("should return false for invalid auth tokern", function(){
            authController
                .isAuthorized("invalid")
                .should.be.false;
        });
    });
});