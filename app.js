require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var passport = require('passport');

var session =require('express-session');
var flash = require('flash');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hjs');
app.set('view engine','ejs');

app.use(session({ key: 'user_sid',secret: 'cats', resave: true, saveUninitialized: true,cookie: {
  expires: 600000}  }));


app.use(flash());
   
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',require('./routes/login'));
app.use('/',require('./routes/dashboard'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', require('./routes/anzar'))
app.use('/', require('./routes/chat'))


app.io = io();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
