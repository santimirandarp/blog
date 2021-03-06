import dotenv from "dotenv"; dotenv.config();

/** workaround for __dirname */
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

/* ================  IMPORTS  ================= */ 
import express from "express";
import ejs from "ejs";
import createError from "http-errors";
import path from "path";

/** debug is like console.log, but turned on using DEBUG=* node app.js */
//import debug from "debug"; debug("test:server");
import logger from "morgan"; /* another middleware to log data */
import mongoose from "mongoose";

/** Initialize express App & connect to mongo db using mongoose.connect */
const app = express();

/* ===============  DATABASE ================= */ 
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

/** Mongoose starts using models immediately, without waiting for mongoose to establish a connection to MongoDB. @return promise*/
mongoose.connect(process.env.URI_DB, mongo_opts)
  .catch(e => console.error(e, "Connection to DB failed."));
  /** Mongoose creates a default connection when you call mongoose.connect(). You can access the default connection using mongoose.connection.*/
 let db = mongoose.connection;
 db.on("error", e => console.log(e));//catches errors AFTER connection is successful.




/* ===================== ROUTES ===================== */
import indexRouter from "./routes/home.js";
import blogRouter from "./routes/blog.js";
import aboutRouter from "./routes/about.js";
import commentsRouter from "./routes/comments.js";

/* Register View Engine, EJS */
app.engine(".html", ejs.__express);
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "html");


app.use(logger("dev")); //Morgan, logs every request. Useful.

/* Static Files */
app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use("/font", express.static(path.join(__dirname,"public/font")));
app.use("/stylesheets",express.static(path.join(__dirname,"public/stylesheets")));
app.use("/javascripts",express.static(path.join(__dirname,"public/javascripts")));

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/blog", blogRouter);
app.use("/comments", commentsRouter);
/* Only gets here if none of prev routes was a match catch 404 and forward to error handler */
app.use((req, res, next) =>  next(createError(404)));

  /** What does next do? Simple, it tells your app to run the next middleware. What happens when you pass something to next? Express will abort the current stack and will run all the middleware that has 4 parameters.(stackoverflow) 
    Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don???t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.(express docs)  */

  //eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
     
      // render the error page
      err.message="We can't access this page right now";
      res.status(err.status || 500);
      res.render("error/index",err);
      });

export default app;
