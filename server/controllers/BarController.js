var express = require('express'),
	router = express.Router(),
	Bar = require('../models/Bar')
	User = require('../models/User'),
	bodyParser = require('body-parser')
	axios = require('axios');

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

	axios.get("https://api.yelp.com/v3/businesses/search?term=bars&radius=500&limit=40&open_now=true&latitude=" + request.body.lat + "&longitude=" + request.body.long, {headers: {'Authorization': 'Bearer ' + process.env.TOKEN}} )
	.then(function(response){
		console.log(response)
	})






	// var bar = new Bar({
	// 		name: request.body.name,
	// 		yelpId: request.body.yelpId,
	// 		location: request.body.location
	// 	})
	// bar.save();
	// response.redirect('/bar/assignment')
})

//GET request to /bar/assignment
router.get('/assignment', function(request, response){
	// if(request.session.loggedIn === true){
		

		response.render('assignment', bar)
	// }else{
		// response.redirect('/')
	// }
})

module.exports= router;