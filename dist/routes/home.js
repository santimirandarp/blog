import path from "path"; 
import {dirname} from "path"; 
import { fileURLToPath } from "url";
import fs from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));
    
import express from "express";
const router = express.Router();
import date from "../views/settings/date.js";
import {title, navigationLinks } from "../views/settings/variables.js";
const cssPath = "home/index.css";
const page = "Home";

const hosts = {	
thabarwa:{
url:"https://thabarwanaturecentre.org",
      aname:"Thabarwa Nature Centre",
      plus:"",
      howLong:"3 months",
      area:"Piedmont, Italy"
},
cotna:{
url:"https://cotna.co.uk/",
      aname:"Cotna",
      plus:"Eco Retreat",
      howLong:"6 weeks",
      area:"Cornwall, UK"
},
jonathan:{ 
url:"https://theenchantedwilderness.co.uk/",
    aname:"Enchanted Wilderness",
    plus:"", 
    howLong:"2 months", 
    area:"Devon, UK",
    review:"/images/reviews/jonathan.jpg"
         },
skye:{
url:"http://skyebackpackers.com/",
    aname:"Skye Backpackers",
    plus:"Hostel", 
    howLong:"5 months", 
    area:"Isle Of Skye, UK",
    review:"/images/reviews/skye.jpg"
     },
bosavern:{
url:"https://bosaverncommunityfarm.org.uk/",
    aname:"Bosavern",
    plus:"Community Farm", 
    howLong:"5 weeks", 
    area:"Cornwall, UK"
         }
};

/* GET home page. */
router.get("/", function(req, res) {
    res.render("home/index", {page,cssPath,hosts,title,navigationLinks,date} );
    });

/* Get Images */
router.get("/gallery", async(req,res) => {
    const gallery = path.join(__dirname, "../public/images/gallery/");
    await fs.readdir(gallery, (err, files) => {
        if (err) { console.log(err); res.json({e:err});}
        const images = files.filter(file => file.substring(0,7)==="gallery");
        res.json({images:images});
        });
});

export default router;
