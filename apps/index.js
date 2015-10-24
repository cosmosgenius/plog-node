'use strict';

let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');
let responseTime = require('response-time');
let cors = require('cors');

let logapp = require('./log');

let app = express();

/* istanbul ignore if  */
if(app.get('env') === 'production') {
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

} else {
    mongoose.set('debug', true);
    app.use(morgan('dev'));
}

app.use(responseTime({
        digits: 5
    }));

app.use(cors());
app.use('/logs', logapp);

module.exports = app;
