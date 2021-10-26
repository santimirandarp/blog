// find metadata about the posts.
// the metadata is loaded manually to the mongo database.

import path from "path"; 
import {dirname} from "path"; 
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

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
router.get("/:post", (req,res) => {
const {post} = req.params;
const loc = "blog/blog_template";
const cssPath = "blog/index.css";
const page = `Post ${post}`;
const data = fs.readdirSync(path.join(__dirname, "../views/blog/", post));

res.render(loc, {
      page,
      cssPath,
      title,
      navigationLinks,
      date,
      data
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
