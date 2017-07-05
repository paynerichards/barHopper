var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path');

	require('./db/db.js');

var UserController = require('./controllers/UserController');

app.use('/user', UserController);

app.get('/', function(request, response){
	response.render('login')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

server.listen(3000, function(){
	console.log('listening on port 3000')
})