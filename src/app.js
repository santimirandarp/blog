/** import dotenv first*/
import dotenv from "dotenv";
dotenv.config();

/** workaround for __dirname */
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/** External packages */
/** We use ejs render engine. Instead of html, we write EJS; instead of res.sendFile(file) we use 
res.render(file,options) where options is an object. This allows more flexibility, and all template engines are pretty much the same */
import ejs from 'ejs';
/** createError is a middleware (app.use(middleware)) that we will redirect some errors to. */
import createError from "http-errors";
import express from "express";
import path from "path";
//import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import multiparty from "multiparty";

/** Initialize express app & connect to mongo db using mongoose.connect */
const app = express();
const mongo_opts = { 
useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true,
                 useFindAndModify: false,
                 autoIndex: false, // Don't build indexes specified in models.
                 poolSize: 10, // Maintain up to 10 socket connections
                 serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                 socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                 family: 4 // Use IPv4, skip trying IPv6
};

/** Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB. @return promise */
const db = mongoose.connect(process.env.URI_DB,mongo_opts)
  .then(s=>console.log('connected'))
  .catch(e=>{throw new Error(e)});
  /** catches errors after connection was established */
db.on('error', err => {throw new Error(err)});

  /** Import express Route Files */
  import commentsRouter from "./routes/comments.js";
  import indexRouter from "./routes/index.js";
  import picturesRouter from "./routes/pictures.js";
  import aboutRouter from "./routes/about.js";

  /** view engine setup: register as html, set path to views directory 
    and set engine */
  app.engine('.html', ejs.__express);
  app.set("views", path.join(__dirname, "views")); 
  app.set("view engine", "html")
  /** Middlewares: access the req object and -may- do something, 
    for every type of request */
  app.use(logger("dev"));



  app.use("/reviews",express.static(path.join(__dirname,"public/images/reviews")));
  app.use("/public/gallery",express.static(path.join(__dirname,"public/images/gallery")));
  app.use("public/images",express.static(path.join(__dirname,"public/images/")));
  app.use("/favicon",express.static(path.join(__dirname,"public/images/meta")));
  app.use("/font", express.static(path.join(__dirname,"public/font")));
  app.use(express.static(path.join(__dirname,"public/")));

/** ROUTES. Routes will deal with errors internally, providing more context to user, 
but if no method+route match occurs,the requests ends on the error handler below */

  app.use("/", indexRouter);
  app.use("/pictures", picturesRouter);
  app.use("/about", aboutRouter);
  app.use("/comments",commentsRouter);


  // Only gets here if none of prev routes was a match
  // catch 404 and forward to error handler
  app.use((req, res, next) =>  next(createError(404)) );


  /** What does next do? Simple, it tells your app to run the next middleware. What happens when you pass something to next? Express will abort the current stack and will run all the middleware that has 4 parameters.(stackoverflow) 
Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.(express docs)  */

  app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
      });

export default app;
