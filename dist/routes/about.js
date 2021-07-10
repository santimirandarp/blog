import express from 'express';
const router = express.Router();
import fs from "fs";
import path from 'path';

// local
import date from '../local_modules/date.js';
import {title, navigationLinks} from "./variables.js";
const cssPath = 'about/about'
const page = "about"
/* GET users listing. */

router.get('/', (req,res)=> res.render('about', {
      page,
      cssPath,
      title,
      navigationLinks,
      date
}));

export default router;
