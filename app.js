//MAIN - Server
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var $ = require('jquery');

var mongoUri = 'mongodb://127.0.0.1/MovieApp';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
	throw new Error('unable to connect to database at ' + mongoUri);
});

// set public path
app.use(express.static(__dirname + '/public'));

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

//require('./models/musician')
require('./models/movie')
require('./routes')(app);

app.listen(8080);
console.log('Listening on port 8080');
