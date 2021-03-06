var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*var routes = require('./routes/index');*/
/*var list = require('./routes/list');*/

/*var compare = require('./routes/compare');
var users = require('./routes/users');*/

//set the port to run on one that is specified or 5000
app.set('port', (process.env.PORT || 5000));



//set connection string to local db
//var localMongoUri = 'mongodb://127.0.0.1/Services';
var mongoUri = 'mongodb://heroku_gwxxlbz7:cfa89t0rf6b7ggtlnp8gd1euqj@ds139715.mlab.com:39715/heroku_gwxxlbz7';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + mongoUri);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/*app.use('/', routes);*/
/*app.use('/list', list);
*//*app.use('/compare', compare);
app.use('/users', users);*/

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
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

/*module.exports = app;*/
//require models file
require('./models/Services');
//require routes file for all routing
require('./routes')(app);

//start the app and listen on the specified port
app.listen(app.get('port'), function(){
    console.log('NICE! We\'re running on port', app.get('port'));
});