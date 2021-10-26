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

import { Post } from "../db/models.js";
import createError from "http-errors";
const ISE = "Internal Server Error. Please try again later.";

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";

router.get("/", (req,res)=> {
const cssPath = "blog/index.css";
const page = "Blog";
res.render("blog/index", { page, cssPath, title, navigationLinks, date }); 
});

router.get("/:post", (req,res) => {
let toRender = {};
toRender.post = req.params.post;
toRender.loc = "blog/blog_template";
toRender.cssPath = "blog/index.css";
toRender.page = `Post ${toRender.post}`;
toRender.data = fs.readdirSync(path.join(__dirname, "../views/blog/", toRender.post));

res.render(toRender.loc, toRender);

});

router.get("/listOfPosts", async(req,res) => {
await Post.find({}).exec((err,posts) => { 
if(err) { console.error(err); 
next(createError(500, ISE));
} 
res.json(posts);
});
});

export default router;
