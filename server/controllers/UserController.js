var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));

//GET request to /user/register
router.get('/register', function(request, response){
	response.render('register')
})

//POST request to /user/login
router.post('/login', function(request, response){
	//check for existing user, log in
	User.findOne({username: request.body.username}, function(error, user){
		console.log(user)
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

//POST request to /user/register
router.post('/register', function(request, response){
	//create new user
	bcrypt.hash(request.body.password, 10, function(error, hash){
		var user = new User({
			email: request.body.email,
			password: hash,
			username: request.body.username,
			dob: request.body.dob,
			hometown: request.body.hometown
		})
		console.log(user)
		user.save();
		request.session.loggedIn = true;
		response.json('success')
	})
})

//GET request to user/logout
router.get('/logout', function(request, response){
	request.session.loggedIn = false;
	response.redirect('/')
})


module.exports= router;
