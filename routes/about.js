var express = require('express');
var router = express.Router();
const fs = require("fs")
/* GET users listing. */
router.get('/pictures', function(req, res, next) {

// list all files in the directory
let images =  []
fs.readdir("./public/images", (err, files) => {
    if (err) {
        throw err;
    }

    // files object contains all files names
    // log them on console
    files.forEach(file => {
        console.log(file);
	images.append(file)
    });
console.log("got files")
return files	
}).then(files=> res.render('pictures', {title,page,images}))
});

module.exports = router;
