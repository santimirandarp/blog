const express = require('express');
const router = express.Router();
const date=require('../local_modules/lastUpdated')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Two Travellers', date, firstSec:"Why do we travel", secondSec:"How can we help",thirdSec:"I don't know yet"} );
});

module.exports = router;
