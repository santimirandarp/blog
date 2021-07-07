const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');

//local
const date=require('../local_modules/date');
const {title, navigationLinks} = require("./variables");
const cssPath = 'pictures/pictures';
const page = "Pictures";

router.get('/', (req,res)=>{	
// __dirname is very useful for fs module
    const gallery =  path.join(__dirname, "/../public/dist/images/gallery")

    fs.readdir(gallery, (err, files) => {
        if (err)  throw err;
        const images = files;
        res.render('pictures', {page,cssPath,images,title,navigationLinks,date})
        }) });

module.exports = router;
