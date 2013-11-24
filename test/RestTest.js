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

describe('Rest Test', function() {
    before(function(done) {
        mongoose.connect(config.mongouri, function() {
            mongoose.connection.db.dropDatabase(function() {
                done();
            });
        });
    });

    describe('Empty DB test', function () {
        it('GET /plog', function (done) {
            request
                .get('/plog')
                .expect(200)
                .end(function(err, res) {
                    test = res.body.should.be.empty;
                    if (err) {
                        done(err);
                    }
                    done();
                });
        });
    });

    describe('One Log Test', function () {
        it('POST /plog', function (done) {
            request
                .post('/plog')
                .send(testData[0])
                .expect(201)
                .end(function(err, res) {
                    res.body.should.include(testData[0]);
                    if (err) {
                        done(err);
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
                        done(err);
                    }
                    done();
                });
        });
    });
});