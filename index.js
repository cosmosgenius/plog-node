'use strict';

require('./lib/env')();
let http = require('http');
let mongoose = require('mongoose');
let morgan = require('morgan');
let responseTime = require('response-time');
let app = require('./apps');
let server = http.createServer(app);
let env = process.env.NODE_ENV || 'dev';

if('development' === env) {
    mongoose.set('debug', true);
    app.use(morgan('dev'));
    app.use(responseTime({
        digits: 5
    }));
}

if('production' === env) {
    mongoose.set('debug', false);
    let format = {
        'remote_addr': ':remote-addr',
        'remote_user': ':remote-user',
        'time': ':date[iso]',
        'method': ':method',
        'url': ':url',
        'http_version': ':http-version',
        'status': ':status',
        'result_length': ':res[content-length]',
        'referrer': ':referrer',
        'user_agent': ':user-agent',
        'response_time': ':response-time',
    };
    app.use(morgan(JSON.stringify(format)));
    app.use(responseTime({
        digits: 5
    }));
}

let db = mongoose.connection;
let dboptions = {
    server: {
        socketOptions: {
            keepAlive: 1,
            autoReconnect: true
        }
    }
};

db.on('connecting', function() {
    console.log('connecting to MongoDB...');
});
db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('MongoDB connected!');
});
db.once('open', function() {
    console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    db.close();
    mongoose.connect(process.env.MONGODB, dboptions);
});
mongoose.connect(process.env.MONGODB, dboptions);

server.listen(8000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(
        'Express server listening on port %d in %s mode',
        server.address().port,
        app.settings.env
    );
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
