const express = require('express');
import router from express.Router(;
import fs from "fs";
import path from 'path';

// local
import date from '../local_modules/date'
import {title, navigationLinks} from "./variables"
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
