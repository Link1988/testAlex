var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var connect = require ('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var Data = require('./models/Data')();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(express.static( path.join( __dirname, '/app') ));
app.use(function(req,res,next){
  req.db = db;
  next();
});
app.get('/', function(req, res){
  //res.sendfile( path.join( __dirname, '/app/index.html' ) );
});

// I execute this method because I want insert the remote data from the url 
Data.consoleTest();
Data.firstInsert();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

app.get('/', function(req, res) {
  res.sendFile('/index.html', {root: __dirname })
});

// Method to update the collections every 30 seconds 
setInterval(function () {    
  Data.updateData(function (err, updated) {
    if (err) {
      console.log("No documents updated for " + err)
    }
  });    
}, 30000);

module.exports = app;
