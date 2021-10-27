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
    res.render("blog/index", {title,navigationLinks,date,cssPath,page}); 
    });

router.get("/post/:num", (req,res) => {
    try{
    const {num} = req.params;
    const template = "blog/blog_template";
    const cssPath = "blog/index.css";
    const page = `Post ${num}`;
    const data = fs.readFileSync(path.join(__dirname, "../views/blog/", num, "index.html"));
    res.render(template,{num,cssPath,page,data,navigationLinks,date,title});
    } catch(e){next(createError(404));}
    });

router.get("/listOfPosts", async(req,res) => {
    try{ await Post.find({}).exec((err,posts) => { 
        if(err) { console.error(err); 
        next(createError(500, ISE));
        } else res.json(posts);
        });} 
    catch(e) { console.error(e);
    next(createError(500,ISE));
    }
    });

export default router;
