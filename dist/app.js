/** import dotenv first*/
import dotenv from "dotenv";
dotenv.config();

/** workaround for __dirname */
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/** External packages */
import ejs from 'ejs';
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
                 useUnifiedTopology: true 
                   useCreateIndex: true,
                 useFindAndModify: false,
                 autoIndex: false, // Don't build indexes specified in models.
                 poolSize: 10, // Maintain up to 10 socket connections
                 serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                 socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                 family: 4 // Use IPv4, skip trying IPv6
};
/** Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB. @return promise */
mongoose.connect(process.env.URI_DB,mongo_opts)
  .then(s=>console.log('connected'))
  .catch(e=>console.error(e));
  /** catches errors after connection was established */
  mongoose.connection.on('error', err => console.error(err));

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

  /** enable routes for exact match on path */
  app.use("/", indexRouter);
  app.use("/pictures", picturesRouter);
  app.use("/about", aboutRouter);
  app.use("/comments",commentsRouter);


  // Only gets here if none of prev routes was a match
  // catch 404 and forward to error handler
  app.use(function(req, res, next) { next(createError(404)); });

  
/** Error handler. Comes directly here when we pass a parameter to next, So what does next do? Simple, it tells your app to run the next middleware. But what happens when you pass something to next? Express will abort the current stack and will run all the middleware that has 4 parameters. */

  app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
      });

export default app;
