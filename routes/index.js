const express = require('express');
const router = express.Router();
const date=require('../local_modules/lastUpdated')

const hosts = { 
	cotna:{
		url:'https://cotna.co.uk/',
		aname:'Cotna',
		plus:'Eco Retreat',
		howLong:'6 weeks',
		area:'Cornwall'
	},
	jonathan:{ 
		url:'https://www.theenchantedwilderness.co.uk/',
		aname:'Enchanted Wilderness',
		plus:'', 
		howLong:'2 months', 
		area:'Devon',
		review:'/images/reviews/jonathan.jpg'
	},
	skye:{
		url:'http://skyebackpackers.com/',
		aname:'Skye Backpackers',
		plus:'Hostel', 
		howLong:'5 months', 
		area:'Isle Of Skye',
		review:'/images/reviews/skye.jpg'
	},
	bosavern:{
		url:'https://www.bosaverncommunityfarm.org.uk/',
		aname:'Bosavern',
		plus:'Community Farm', 
		howLong:'5 weeks', 
		area:'Cornwall'
}
}
const navigationLinks= [
		  {name:'Home', path:'/'}, 
		  {name:'Pictures',path:'/pictures'},
		  {name:'About', path:'/about'}
	  ]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	  hosts,
	  navigationLinks,
	  title: 'Two Travellers', 
	  page:'Home',
	  date, 
	  firstSec:"Who we are", 
	  secondSec:"How we can help", 
          mainImg:"/images/cropped_mainImg.jpg",
	  where:"Lazio, Italy",
	  greeting:"Hi there!"
  });
});

module.exports = router;
