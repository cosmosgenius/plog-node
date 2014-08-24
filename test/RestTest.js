/*jslint node: true */
/*jslint nomen: true*/
/*jshint expr: true*/
/*global describe, it, before, after */
'use strict';

var request     = require('supertest'),
    mongoose    = require('mongoose'),
    testData    = require('./testData'),
    Log         = require('../app/models').Log,
    app         = require('../app');

request = request(app);
var responseData = [];

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

        it('GET /', function (done) {
            request
                .get('/')
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

    describe('Testing POST function', function () {
        before(cleardb);

        it('POST /', function (done) {
            request
                .post('/')
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

        it('GET /:id', function (done) {
            request
                .get('/' + responseData[0]._id)
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

    describe('Testing DELETE function', function () {
        before(cleardb);

        it('POST /', function (done) {
            request
                .post('/')
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

        it('GET /:id', function (done) {
            request
                .get('/' + responseData[0]._id)
                .expect(200)
                .end(function(err, res) {
                    res.body.should.eql(responseData[0]);
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('DELETE /:id', function (done) {
            request
                .del('/' + responseData[0]._id)
                .expect(204)
                .end(function(err) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('GET /:id', function (done) {
            request
                .get('/' + responseData[0]._id)
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

        it('GET /', function (done) {
            request
                .get('/52892747ad2582d024000004')
                .expect(404)
                .end(function(err, res) {
                    res.body.should.eql({'error': 'Object doesn\'t exist'});
                    return done(err);
                });
        });
    });

    describe('POST negative flows', function () {
        before(cleardb);

        it('POST / with request type text/html', function (done) {
            request
                .post('/')
                .set('Content-Type', 'text/html')
                .send('test')
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Type should be json'});
                    return done(err);
                });
        });

        it('POST / with request type application/x-www-form-urlencoded', function (done) {
            request
                .post('/')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(testData[0])
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Type should be json'});
                    return done(err);
                });
        });

        it('POST / with empty body', function (done) {
            request
                .post('/')
                .set('Content-Type', 'application/json')
                .send()
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Request cannot be empty'});
                    return done(err);
                });
        });

        it('POST / with Invalid json request', function (done) {
            request
                .post('/')
                .set('Content-Type', 'application/json')
                .send("{p: 'p'}")
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Invalid POST request.'});
                    return done(err);
                });
        });

        it('POST / with Invalid request', function (done) {
            request
                .post('/')
                .set('Content-Type', 'application/json')
                .send({p: 'p'})
                .expect(400)
                .end(function(err, res) {
                    res.body.should.eql({error: 'Invalid POST request.'});
                    return done(err);
                });
        });
    });

    describe('DELETE negative flow', function () {
        before(cleardb);

        it('DELETE /:id', function (done) {
            request
                .delete('/52892747ad2582d024000004')
                .expect(404)
                .end(function(err, res) {
                    res.body.should.eql({'error': 'Object doesn\'t exist'});
                    return done(err);
                });
        });
    });
});