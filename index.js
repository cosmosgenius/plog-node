/*jslint node: true */
'use strict';

var mongoose    =   require('mongoose'),
    express     =   require('express'),
    http        =   require('http');


var config      =   require('./instance/config'),
    Log         =   require('./models').Log,
    app         =   express(),
    server      =   http.createServer(app);


app.use(express.logger('dev'));
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

app.use(express.json());
app.use(express.urlencoded());

app.get('/log', function(req, res) {
    return Log.find(function(err, logs) {
        if (err) {
            return console.dir(err);
        }
        return res.json(logs);
    });
});

app.get('/log/:id', function(req, res) {
    return Log.findById(req.params.id, function(err, log) {
        if (err) {
            return console.dir(err);
        }
        return res.json(log);
    });
});

app.post('/log', function(req, res) {
    var newlog = new Log({log: req.rawBody});
    newlog.save(function(err) {
        if (err) {
            return console.dir(err);
        }
        console.log('created');
    });
    return res.json(newlog);
});

app.del('/log/:id', function (req, res) {
    return Log.findById(req.params.id, function (err, log) {
        return log.remove(function (err) {
            if (!err) {
                console.log('removed');
            } else {
                console.log(err);
            }
            return res.send('');
        });
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