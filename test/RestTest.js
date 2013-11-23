/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var request     = require('supertest'),
    should      = require('should'),
    mongoose    = require('mongoose'),
    config      = require('../instance/config');

request = request('http://localhost:8500');

var test;

describe('Rest Test', function() {
    before(function(done) {
        mongoose.connect(config.mongouri, function() {
            mongoose.connection.db.dropDatabase(function() {
                done();
            });
        });
    });

    it('Get', function (done) {
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