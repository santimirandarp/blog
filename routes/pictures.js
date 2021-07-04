var express = require('express');
var router = express.Router();
const fs = require("fs")
const date=require('../local_modules/lastUpdated')
const {title, navigationLinks} = require("./variables")
const page = "Pictures"
/* GET users listing. */

router.get('/', (req,res)=>{	
// list all files in the directory
fs.readdir("./public/images", (err, files) => {
    if (err) {
        throw err;
    }

let images =  []
    // files object contains all files names
    // log them on console
    files.forEach(file => {
        console.log(file);
	images.push(file)
    });
	res.render('pictures', {page,images,title,navigationLinks,date})

}) });

module.exports = router;
