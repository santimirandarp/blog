// find metadata about the posts.
// the metadata is loaded manually to the mongo database.

import dotenv from "dotenv"; dotenv.config();
import express from "express";
const router = express.Router();

import mongoose from "mongoose";
import { Post } from "../db/models.js";
import createError from "http-errors";
const ISE = "Internal Server Error. Please try again later.";

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";

mongoose.connect(process.env.URI_DB, {useNewUrlParser:true, useUnifiedTopology:true});

router.get("/", (req,res)=> {
const cssPath = "blog/index.css";
const page = "Blog";

res.render("blog/index", {
      page,
      cssPath,
      title,
      navigationLinks,
      date
});
return 0;
});

// posts/1, posts/2 etc.
router.get("/posts/:post", (req,res) => {
const {post} = req.params;
const loc = `blog/${post}/index`;
const cssPath = "blog/index.css";
const page = `Post ${post}`;

res.render(loc, {
      page,
      cssPath,
      title,
      navigationLinks,
      date
});

});

router.get("/listOfPosts", async(req,res) => {
const data = await Post.find({}).exec((err,posts) => { 
console.log(err,posts);
err? next(createError(500, ISE)): res.json(posts);
});
return data;
});

export default router;
