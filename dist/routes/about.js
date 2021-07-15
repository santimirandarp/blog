import express from "express";
const router = express.Router();

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";
const cssPath = "about/about";
const page = "about";
/* GET users listing. */

router.get("/", (req,res)=> res.render("about", {
      page,
      cssPath,
      title,
      navigationLinks,
      date
}));

export default router;
