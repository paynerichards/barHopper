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

	axios.get("https://api.yelp.com/v3/businesses/search?term=bars&radius=" + request.body.radius + "&limit=40&open_now=true&latitude=" + request.body.userLat + "&longitude=" + request.body.userLong, {headers: {'Authorization': 'Bearer ' + process.env.TOKEN}} )
	.then(function(res){
		var randBar = res.data.businesses[random()];
		console.log(randBar);
		Bar.findOne({yelpId: randBar.id}, function(error, oldBar){
			if(bar){
				response.send(oldBar)
			}else{
				var bar = new Bar({
					name: randBar.name,
					yelpId: randBar.id,
					location: {
						type: "Point",
						coordinates: [randBar.coordinates.longitude, randBar.coordinates.latitude]
					},
					imageUrl: randBar.image_url,
					address: randBar.location.display_address,
					phone: randBar.display_phone
				})		
				bar.save();
				response.send(bar);
				console.log(bar.address);
			}
		})

	})



})

//GET request to /bar/assignment/:id
router.get('/assignment/:id', function(request, response){
	var id = request.params.id;
	Bar.findById(id, function(error, bar){
		console.log(id);
		console.log(bar);
		response.render('assignment', bar)
	})
})

module.exports = router;
