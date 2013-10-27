/*jslint node: true */
'use strict';

var mongoose    =   require('mongoose'),
    express     =   require('express');

var Log = mongoose.model('Log',{log:String}),
    app = express();

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
    mongoose.connect("mongodb://localhost/test");
    Log.find(function(err,logs){
        res.json(logs);
        mongoose.disconnect();
    });
});

app.post('/',function(req, res) {
    mongoose.connect("mongodb://localhost/test");
    var newlog = new Log({log: req.rawBody});
    newlog.save(function(err){
        mongoose.disconnect();
    });
    res.send("Log Added");
});
app.listen(8000);