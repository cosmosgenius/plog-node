'use strict';

require('./env')();
let http = require('http');
let mongoose = require('mongoose');
let morgan = require('morgan');
let responseTime = require('response-time');
let app = require('./apps');
let server = http.createServer(app);
let env = process.env.NODE_ENV || 'dev';

if('dev' === env) {
    mongoose.set('debug', true);
    app.use(morgan('dev'));
    app.use(responseTime({
        digits: 5
    }));
}

if('production' === env) {
    mongoose.set('debug', true);
    app.use(morgan('dev'));
    app.use(responseTime({
        digits: 5
    }));
}

server.listen(8000, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
