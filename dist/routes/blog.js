import express from "express";
const router = express.Router();
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
//const __dirname = dirname(fileURLToPath(import.meta.url));

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";

  /* Static Files */
//app.use("/images",express.static(path.join(__dirname,"public/images")));
//app.use("/font", express.static(path.join(__dirname,"public/font")));
//app.use("/stylesheets",express.static(path.join(__dirname,"public/stylesheets")));
//app.use("/javascripts",express.static(path.join(__dirname,"public/javascripts")));


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

// posts/post_1, posts/posts_2 etc.
router.get(":post", (req,res)=> {
const post = req.params.post;
const postNum = post.split("_")[1];

const loc =`blog/${post}/index`;
const cssPath="blog/index.css";
const page=`Post ${postNum}`;

res.render(loc, {
      page,
      cssPath,
      title,
      navigationLinks,
      date
});

});

export default router;
