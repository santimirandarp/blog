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
const mongo_opts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.URI_DB,mongo_opts);

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

const parseForm = (req,res,next)=>{
  if(req.headers["content-type"] && req.headers["content-type"].split(';')[0]==="multipart/form-data"){
    let form  = new multiparty.Form();
    form.parse(req, (err,fields,files) => {
        if (err) console.log(err);
        res.locals.comment=fields;
        })
  } 
 next() 
}



app.use("/reviews",express.static(path.join(__dirname,"public/images/reviews")));
app.use("/public/gallery",express.static(path.join(__dirname,"public/images/gallery")));
app.use("public/images",express.static(path.join(__dirname,"public/images/")));
app.use("/favicon",express.static(path.join(__dirname,"public/images/meta")));
app.use(express.static(path.join(__dirname,"public/")));

/** enable routes for exact match on path */
app.use("/", indexRouter);
app.use("/pictures", picturesRouter);
app.use("/about", aboutRouter);

app.use(parseForm);
app.use("/comments",commentsRouter);


// Only gets here if none of prev routes was a match
// catch 404 and forward to error handler
app.use(function(req, res, next) { next(createError(404)); });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
    });

export default app;
