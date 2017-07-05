var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	path = require('path')
	session = require('express-session');

	require('./db/db.js');

app.use(session({
	secret: "StoolHopping is a fun time",
	resave: false,
	saveUnitialized: true,
	cookie: {secure: false}
}));

var UserController = require('./controllers/UserController');
var BarController = require('./controllers/BarController');

app.use('/user', UserController);
app.use('/bar', BarController);


//GET request to / 
app.get('/', function(request, response){
	response.render('login')
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

server.listen(3000, function(){
	console.log('listening on port 3000')
})