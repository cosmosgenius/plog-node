/*jslint node: true */
/*jslint nomen: true*/
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var request     = require('supertest'),
    should      = require('should'),
    mongoose    = require('mongoose'),
    config      = require('../instance/config'),
    testData    = require('./testData');

request = request('http://localhost:' + config.port);
var test;

describe('Plog RestAPI Tests', function() {
    describe('Testing GET function for empty DB', function () {
        before(function(done) {
            mongoose.connect(config.mongouri, function() {
                mongoose.connection.db.dropDatabase(function() {
                    done();
                    mongoose.disconnect();
                });
            });
        });

        it('GET /plog', function (done) {
            request
                .get('/plog')
                .expect(200)
                .end(function(err, res) {
                    test = res.body.should.be.empty;
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });

    describe('Testing POST function', function () {
        before(function(done) {
            mongoose.connect(config.mongouri, function() {
                mongoose.connection.db.dropDatabase(function() {
                    done();
                    mongoose.disconnect();
                });
            });
        });

        it('POST /plog', function (done) {
            request
                .post('/plog')
                .send(testData[0])
                .expect(201)
                .end(function(err, res) {
                    res.body.should.include(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                    testData[0] = res.body;
                });
        });

        it('GET /plog', function (done) {
            request
                .get('/plog/' + testData[0]._id)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.include(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });

    describe('Testing DELETE function', function () {
        it('POST /plog', function (done) {
            request
                .post('/plog')
                .send(testData[0])
                .expect(201)
                .end(function(err, res) {
                    res.body.should.include(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                    testData[0] = res.body;
                });
        });

        it('GET /plog', function (done) {
            request
                .get('/plog/' + testData[0]._id)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.include(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('DELETE /plog', function (done) {
            request
                .del('/plog/' + testData[0]._id)
                .expect(204)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('GET /plog', function (done) {
            request
                .get('/plog/' + testData[0]._id)
                .expect(200)
                .end(function(err, res) {
                    test = res.body.should.be.empty;
                    return done(err);
                });
        });
    });
});