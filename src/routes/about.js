import express from "express";
const router = express.Router();

// local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";
const cssPath = "about/index.css";
const page = "About";


router.get("/", (req,res) => res.render("about/index", {
      page,
      cssPath,
      title,
      navigationLinks,
      date
}));

export default router;
