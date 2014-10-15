/*jslint node: true */
/*jslint nomen: true*/
/*jshint expr: true*/
/*global describe, it, before */
"use strict";

var request     = require("supertest"),
    should      = require("should"),
    testData    = require("./testData"),
    Log         = require("../app/models").Log,
    app         = require("../app");

request = request(app);
var responseData = [];

function cleardb(done) {
    Log.remove(function() {
        done();
    });
}

describe("Plog RestAPI Tests Positive flow", function() {
    describe("Testing GET function for empty DB", function () {
        before(cleardb);

        it("GET /", function (done) {
            request
                .get("/")
                .expect(200)
                .end(function(err, res) {
                    res.body.should.be.empty;
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });

    describe("Testing POST function", function () {
        before(cleardb);

        it("POST /", function (done) {
            request
                .post("/")
                .send(testData[0])
                .expect(201)
                .end(function(err, res) {
                    res.body.should.have.properties(testData[0]);

                    if (err) {
                        return done(err);
                    }
                    done();
                    responseData[0] = res.body;
                });
        });

        it("GET /:id", function (done) {
            request
                .get("/" + responseData[0].id)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.eql(responseData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });

    describe("Testing DELETE function", function () {
        before(cleardb);

        it("POST /", function (done) {
            request
                .post("/")
                .send(testData[0])
                .expect(201)
                .end(function(err, res) {
                    res.body.should.have.properties(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                    responseData[0] = res.body;
                });
        });

        it("GET /:id", function (done) {
            request
                .get("/" + responseData[0].id)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.eql(responseData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it("DELETE /:id", function (done) {
            request
                .del("/" + responseData[0].id)
                .expect(204)
                .end(function(err) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it("GET /:id", function (done) {
            request
                .get("/" + responseData[0].id)
                .expect(404)
                .end(function(err, res) {
                    should.exist(res.body.message);
                    return done(err);
                });
        });
    });
});

describe("Plog RestAPI Tests Negative flow", function() {
    describe("GET negative flow", function () {
        before(cleardb);

        it("GET /", function (done) {
            request
                .get("/52892747ad2582d024000004")
                .expect(404)
                .end(function(err, res) {
                     should.exist(res.body.message);
                    return done(err);
                });
        });
    });

    describe("POST negative flows", function () {
        before(cleardb);

        it("POST / with empty body", function (done) {
            request
                .post("/")
                .set("Content-Type", "application/json")
                .send()
                .expect(400)
                .end(function(err, res) {
                    should.exist(res.body.message);
                    return done(err);
                });
        });

        it("POST / with Invalid request", function (done) {
            request
                .post("/")
                .set("Content-Type", "application/json")
                .send({p: "p"})
                .expect(400)
                .end(function(err, res) {
                    should.exist(res.body.message);
                    return done(err);
                });
        });
    });

    describe("DELETE negative flow", function () {
        before(cleardb);

        it("DELETE /:id", function (done) {
            request
                .delete("/52892747ad2582d024000004")
                .expect(404)
                .end(function(err, res) {
                    should.exist(res.body.message);
                    return done(err);
                });
        });
    });
});