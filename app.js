//MAIN - Server
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var $ = require('jquery');

app.set('port', (process.env.PORT || 5000));

//var mongoUri = 'mongodb://127.0.0.1/MovieApp';
var mongoUri = 'mongodb://heroku_5sv4k7jl:7rmbrhjhskfd620emm367u7o5j@ds023478.mlab.com:23478/heroku_5sv4k7jl';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
	throw new Error('unable to connect to database at ' + mongoUri);
});

// set public 
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.bodyParser());

/*app.configure(function(){
  app.use(express.bodyParser());
});*/
/*app.get('/', function(req, res){
	res.send('Hello World from Express!');
});*/

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


//require('./models/musician')
require('./models/movie')
require('./routes')(app);

app.listen(app.get('port'), function(){
    console.log('Node app is running on port', app.get('port'));
});