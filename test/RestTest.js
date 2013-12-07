/*jslint node: true */
/*jslint nomen: true*/
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var request     = require('supertest'),
    should      = require('should'),
    mongoose    = require('mongoose'),
    config      = require('../instance/config'),
    testData    = require('./testData'),
    Log         = require('../models').Log;

request = request('http://localhost:' + config.port);
var test;

function cleardb(done) {
    Log.remove(function() {
        done();
    });
}

after(function(done) {
    mongoose.disconnect();
    done();
});

describe('Plog RestAPI Tests Positive flow', function() {
    describe('Testing GET function for empty DB', function () {
        before(cleardb);

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
        before(cleardb);

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
                    res.body.should.eql(testData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });

    describe('Testing DELETE function', function () {
        before(cleardb);

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
                    res.body.should.eql(testData[0]);
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
                .expect(404)
                .end(function(err, res) {
                    res.body.should.eql({'error': 'Object doesn\'t exist'});
                    return done(err);
                });
        });
    });
});

describe('Plog RestAPI Tests Negative flow', function() {
    describe('GET negative flow', function () {
        before(cleardb);

        it('GET /plog/:id', function (done) {
            request
                .get('/plog/52892747ad2582d024000004')
                .expect(404)
                .end(function(err, res) {
                    res.body.should.eql({'error': 'Object doesn\'t exist'});
                    return done(err);
                });
        });
    });

    describe('POST negative flows', function () {
        before(cleardb);

        it('POST /plog with request type text/html', function (done) {
            request
                .post('/plog')
                .set('Content-Type', 'text/html')
                .send('test')
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Type should be json'});
                    return done(err);
                });
        });

        it('POST /plog with request type application/x-www-form-urlencoded', function (done) {
            request
                .post('/plog')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(testData[0])
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Type should be json'});
                    return done(err);
                });
        });

    });
});