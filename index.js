'use strict';

var mongoose    =   require('mongoose'),
    http        =   require('http');


var config      =   require('./instance/config'),
    app         =   require('./app'),
    server      =   http.createServer(app);



server.listen(config.port, function(err) {
    if(err){
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