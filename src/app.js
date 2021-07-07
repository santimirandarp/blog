require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Routes
const indexRouter = require('./routes/index');
const picturesRouter = require('./routes/pictures');
const aboutRouter = require('./routes/about');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

//middlewares access the req object and -may- do something, 
//for every type of request
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public/gallery',express.static(path.join(__dirname, '/public/dist/images/gallery')));
app.use('/public/reviews',express.static(path.join(__dirname, '/public/dist/images/reviews')));
app.use('/public/images',express.static(path.join(__dirname, '/public/dist/images/')));
app.use(express.static(path.join(__dirname, 'public/dist')));

//enables routes for exact match on path
app.use('/', indexRouter);
app.use('/pictures', picturesRouter);
app.use('/about', aboutRouter);
//app.use('/users', usersRouter);

// Only gets here if none of prev routes was a match
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
