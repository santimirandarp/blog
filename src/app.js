import dotenv from 'dotenv';
dotenv.config();

//workaround for __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Routes
import indexRouter from './routes/index.js';
import picturesRouter from './routes/pictures.js';
import aboutRouter from './routes/about.js';
console.log(import.meta.url)
const app = express();

// view engine setup
app.set('views', path.join(import.meta.url, 'views')); 
app.set('view engine', 'ejs'); 

//middlewares access the req object and -may- do something, 
//for every type of request
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/public/gallery',express.static(path.join(__dirname,'public/dist/images/gallery')));
app.use('/public/reviews',express.static(path.join(__dirname,'public/dist/images/reviews')));
app.use('/public/images',express.static(path.join(__dirname,'public/dist/images/images')));
app.use(express.static(path.join(__dirname,'public/dist')));

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

export default app
