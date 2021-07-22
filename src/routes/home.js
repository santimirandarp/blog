import express from "express";
const router = express.Router();
import date from "../views/settings/date.js";
import {title, navigationLinks } from "../views/settings/variables.js";
const cssPath = "home/index.css";
const page = "Home";

const hosts = {	cotna:{
url:"https://cotna.co.uk/",
      aname:"Cotna",
      plus:"Eco Retreat",
      howLong:"6 weeks",
      area:"Cornwall"
},
jonathan:{ 
url:"https://www.theenchantedwilderness.co.uk/",
    aname:"Enchanted Wilderness",
    plus:"", 
    howLong:"2 months", 
    area:"Devon",
    review:"/images/reviews/jonathan.jpg"
         },
skye:{
url:"http://skyebackpackers.com/",
    aname:"Skye Backpackers",
    plus:"Hostel", 
    howLong:"5 months", 
    area:"Isle Of Skye",
    review:"/images/reviews/skye.jpg"
     },
bosavern:{
url:"https://www.bosaverncommunityfarm.org.uk/",
    aname:"Bosavern",
    plus:"Community Farm", 
    howLong:"5 weeks", 
    area:"Cornwall"
         }
};

/* GET home page. */
router.get("/", function(req, res) {
    res.render("home/index", {page,cssPath,hosts,title,navigationLinks,date,images} );
    });

/* Get Images */
router.get("/gallery", async (req,res) => {
    const gallery =  path.join(__dirname, "../public/images/gallery/");
    const files = await fs.readdir(gallery, (err, files) => {
        if (err)  throw err;
        const images = files.filter(file => file.substring(0,7)==="gallery");
        res.json({images:images})
        })})

export default router;