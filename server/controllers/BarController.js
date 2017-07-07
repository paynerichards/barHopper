var express = require('express'),
	router = express.Router(),
	Bar = require('../models/Bar')
	User = require('../models/User'),
	bodyParser = require('body-parser')
	axios = require('axios')
	random = require('../helpers/rng.js');

require('dotenv').config()



router.use(bodyParser.urlencoded({extended: true}));

//GET request to /bar/search
router.get('/search', function(request, response){
	if(request.session.loggedIn === true){
		var loggedIn = {loggedIn: true}
		response.render('search', loggedIn)
	}else{
		response.redirect('/')
	}
})

// POST request to /bar/search
router.post('/search', function(request, response){
	axios.get("https://api.yelp.com/v3/businesses/search?term=bars&radius=" + request.body.radius + "&limit=40&open_now=true&latitude=" + request.body.lat + "&longitude=" + request.body.long, {headers: {'Authorization': 'Bearer ' + process.env.TOKEN}} )
	.then(function(response){
		var randBar = response.data.businesses[random()];
		console.log(randBar);
		var bar = new Bar({
			name: randBar.name,
			yelpId: randBar.id,
			location: {
				type: "Point",
				coordinates: [randBar.coordinates.longitude, randBar.coordinates.latitude]
			},
			imageUrl: randBar.image_url
		})
		bar.save();
	})
	.catch()
})

//GET request to /bar/assignment
router.get('/assignment', function(request, response){
		response.render('assignment', bar)
})

module.exports= router;