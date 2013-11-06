/*jslint node: true */
'use strict';

var mongoose    =   require('mongoose'),
    express     =   require('express'),
    http      =   require('http');

try{
    var config      =   require('./instance/config');
}catch(err){
    switch(err.code){
        case 'MODULE_NOT_FOUND':
            throw 'Config.js doesn\'t exist instance folder.';
        default :
            throw err;
    }
}

var Log     = mongoose.model('Log',{log:String}),
    app     = express(),
    server  = http.createServer(app);

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

app.get('/', function(req, res) {
    Log.find(function(err,logs){
        if(err){
            console.dir(err);
        }
        res.json(logs);
    });
});

app.post('/',function(req, res) {
    var newlog = new Log({log: req.rawBody});
    newlog.save(function(err){
        if(err){
            console.dir(err);
        }
    });
    res.send("Log Added");
});


mongoose.connect(config.mongouri);

server.listen( config.port, function(err) {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env );
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});