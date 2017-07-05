var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));



module.exports= router;