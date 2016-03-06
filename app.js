//MAIN - Server
var express = require('express');
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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.configure(function(){
  app.use(express.bodyParser());
});
/*app.get('/', function(req, res){
	res.send('Hello World from Express!');
});*/

//require('./models/musician')
require('./models/movie')
require('./routes')(app);

app.set('public', path.join( __dirname, 'public'));
app.set('stylesheets', path.join( __dirname, 'stylesheets'));


app.listen(8080);
console.log('Listening on port 8080');
