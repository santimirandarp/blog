const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');

// local
const date=require('../local_modules/date')
const {title, navigationLinks} = require("./variables")
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
