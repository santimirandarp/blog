import express from 'express';
const router = express.Router();
import fs from "fs";
import path from 'path';

//local
import date from '../local_modules/date.js';
import {title, navigationLinks} from "./variables.js";
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

export default router;
