//MAIN - Server
var express = require('express');
var app = express();
var request = require('request');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var nodemailer = require('nodemailer');

//set the port to run on one that is specified or 5000
app.set('port', (process.env.PORT || 5000));

//This is the db connection using Mongoose, we can use a local db connection or the heroku hosted.
//comment the next line and use 'mongoUri' connection string when connecting with heroku db
/*var localMongoUri = 'mongodb://127.0.0.1/MovieApp';*/
var mongoUri = 'mongodb://heroku_5sv4k7jl:7rmbrhjhskfd620emm367u7o5j@ds023478.mlab.com:23478/heroku_5sv4k7jl';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
	throw new Error('unable to connect to database at ' + mongoUri);
});

// set static path to 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
// view engine setup
//we're using JADE eventually we'll want to move to Angular
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//using 'logger' for verbose dev. logging 
app.use(logger('dev'));
//using 'bodyParser' for parsing the body for response objects 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    	console.log("in error message");
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//require models for mongoose db schema setup
require('./models/Movie')
//require routes file for all routing
require('./routes')(app);

//start the app and listen on the specified port
app.listen(app.get('port'), function(){
    console.log('NICE! We\'re running on port', app.get('port'));
});