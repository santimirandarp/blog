import express from "express";
const router = express.Router();
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";
/* GET users listing. */

router.use("/posts", express.static(path.join(__dirname,"posts"))

router.get(":post", (req,res)=> 
const post = req.params.post
const path = `posts/${post}/${post}`
const cssPath = ;
const page = "about";

res.render(path, {
      page,
      cssPath,
      title,
      navigationLinks,
      date
}));

export default router;
