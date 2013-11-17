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
app.use(express.bodyParser());

app.get('/plog', function(req, res) {
    return Log.find(function(err, logs) {
        if (err) {
            return console.dir(err);
        }
        return res.json(logs);
    });
});

app.get('/plog/:id', function(req, res) {
    return Log.findById(req.params.id, function(err, log) {
        if (err) {
            return console.dir(err);
        }
        return res.json(log);
    });
});

app.post('/plog', function(req, res) {
    var newlog;
    if (req.body) {
        newlog = new Log(req.body);
        newlog.save(function(err) {
            if (err) {
                return console.dir(err);
            }
            console.log('created');
        });
    }
    return res.json(newlog);
});

app.del('/plog/:id', function (req, res) {
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