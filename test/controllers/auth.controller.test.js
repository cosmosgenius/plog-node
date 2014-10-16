/*global describe, it */
"use strict";

var config = require("config"),
    should = require("should");

var authController   = require("../../app/controllers/auth.controller");

describe("Auth Controller", function(){
    describe("isAuthorized function", function(){
        it("should return true for valid auth token");
        it("should return false for invalid auth tokern");
    });
});