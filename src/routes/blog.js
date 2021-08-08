import dotenv from "dotenv"; dotenv.config();
import express from "express";
const router = express.Router();

import mongoose from "mongoose";
//import { Post } from "../db/models.js";

//import path from "path";
//import { dirname } from "path";
//import { fileURLToPath } from "url";
////const __dirname = dirname(fileURLToPath(import.meta.url));

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";

//mongoose.connect(process.env.URI_DB, {useNewUrlParser:true});

//const postsMetadataFromDB = () => {
//return Post.find({}).exec((e,d) => { 
//console.log(e,d);
//console.log("finding posts' metadata from  db");
//});
//}
//;

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
});

// posts/1, posts/2 etc.
router.get(":post", (req,res) => {
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

router.get("listOfPosts", async(req,res) => {
//const posts = await postsMetadataFromDB();
return res.json({posts:"hello"});//posts});
});

export default router;
