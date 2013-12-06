/*jslint node: true */
'use strict';

var mongoose    =   require('mongoose'),
    express     =   require('express'),
    http        =   require('http');


var config      =   require('./instance/config'),
    Log         =   require('./models').Log,
    app         =   express(),
    server      =   http.createServer(app);

app.configure('production', function() {
    app.use(express.logger());
});

app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.responseTime());
});

app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

app.get('/plog', function(req, res) {
    return Log.find(function(err, logs) {
        if (err) {
            return res.json(err);
        }
        return res.json(logs);
    });
});

app.get('/plog/:id', function(req, res) {
    return Log.findById(req.params.id, function(err, log) {
        if (log) {
            return res.json(log);
        }
        if (err) {
            return res.json(err);
        }
        return res.json(404, {error: 'Object doesn\'t exist'});
    });
});

app.post('/plog', function(req, res) {
    var newlog,
        JSONobj;
    if (!req.is('json')) {
        return res.json(400, {error: 'Type should be json'});
    }

    if (!req.rawBody) {
        return res.json(400, {error: 'Request cannot be empty'});
    }

    try {
        JSONobj = JSON.parse(req.rawBody);
    } catch (e) {
        return res.json(400, {error: e.message});
    }

    newlog  = new Log(JSONobj);
    newlog.save(function(err, log) {
        if (err) {
            return res.json(err);
        }
        return res.json(201, log);
    });
});

app.del('/plog/:id', function (req, res) {
    return Log.findById(req.params.id, function (err, log) {
        if (log) {
            return log.remove(function (err) {
                if (err) {
                    res.json(err);
                }
                return res.send(204);
            });
        }

        if (!log) {
            if (err) {
                return res.json(err);
            }
            return res.json(404, {error: 'Object doesn\'t exist'});
        }
    });
});


server.listen(config.port, function(err) {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});