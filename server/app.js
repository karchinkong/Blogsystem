var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');


var index = require('./routes/index');
var users = require('./routes/users');
var cpenal = require('./routes/cpenal');
var blogs = require('./routes/blogs');


var app = express();

app.use(cors({
    origin:['http://192.168.124.3:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'username',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 180000000000000}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);
app.use('/cpenal', cpenal);
app.use('/api/blogs', blogs);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
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
