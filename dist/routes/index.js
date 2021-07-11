import express from 'express';
const router = express.Router();
import date from '../views/settings/date.js'
import {title, navigationLinks } from '../views/settings/variables.js'
const cssPath = 'home';
const page = 'Home';
const firstSec = "Who we are";
const secondSec="How we can help";
const mainImg="/images/cropped_mainImg.jpg";
const where="Lazio, Italy";
const greeting="Hi there!"

const hosts = {	cotna:{
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

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', {page,cssPath,firstSec,secondSec,mainImg,where,greeting,hosts,title,navigationLinks,date} );
});

export default router;
