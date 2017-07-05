var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));



//POST request to /user/login
router.post('/login', function(request, response){
	//check for existing user, log in
	User.findOne({email: request.body.email}, function(error, user){
		if(user){
			bcrypt.compare(request.body.password, user.password, function(error, match){
				if(match === true){
					request.session.loggedIn = true;
					response.redirect('/bar/search');
				}else{
					response.redirect('/');
				}
			})
		}else{
			response.redirect('/');
		}
	})
})

//POST request to /users/register
router.post('/register', function(request, response){
	//create new user
	bcrypt.hash(request.body.password, 10, function(error, hash){
		var user = new User({
			email: request.body.email,
			password: hash,
			username: request.body.username
		})
		user.save();
		request.session.loggedIn = true;
		response.redirect('/bar/search')
	})

})

//GET request to user/logout
router.get('/logout', function(request, response){
	request.session.loggedIn = false
	response.redirect('/')
})


module.exports= router;



















