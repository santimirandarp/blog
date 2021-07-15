import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
//local
import date from "../views/settings/date.js";
import {title, navigationLinks} from "../views/settings/variables.js";
const cssPath = "pictures/pictures";
const page = "Pictures";

router.get("/", (req,res)=>{	
// __dirname is very useful for fs module
    const gallery =  path.join(__dirname, "../public/images/gallery/");

    fs.readdir(gallery, (err, files) => {
        if (err)  throw err;
        const images = files.filter(file=>file.substring(0,7)==="gallery");
        res.render("pictures", {page,cssPath,images,title,navigationLinks,date});
        }); });

export default router;
