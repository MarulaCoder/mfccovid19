var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');

var compression = require('compression');
var helmet = require('helmet');

var app = express();


// Set up mongoose connection
//var mongoose = require('mongoose');
//var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
//var mongoDB = process.env.MONGODB_URI || dev_db_url;
//mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// set up postgres database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://njkxorohczavfz:4e6697befe3ddeff41bb4cd4e60cc81cfa689bf3efff57abecc461a4b7ca6826@ec2-54-247-89-181.eu-west-1.compute.amazonaws.com:5432/datkb2031uh5mr');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

/*
// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});
*/

// Set the default views directory to views folder
app.set('views', path.join(__dirname, 'views'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'ejs');

app.use('/', indexRouter);

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
