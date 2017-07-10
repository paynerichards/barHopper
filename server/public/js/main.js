$('#registerSubmit').click(function(){
	var newUser = {
		email: $('#regEmail').val(),
		username: $('#regUsername').val(),
		password: $('#regPass').val(),
		dob: $('regDob').val(),
		hometown: $('#regHome').val()
	}

	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/register',
		data: newUser,
		success: function(response){
			window.location = "http://localhost:3000/bar/search";
		}
	})
});

$('#loginSubmit').click(function(){
	var userInfo = {
		username: $('#loginUser').val(),
		password: $('#loginPass').val()
	}
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/user/login',
		data: userInfo,
		success: function(response){
			window.location = "http://localhost:3000/bar/search"
		}
	})
})

var loc = {
	userLat: 0,
	userLong: 0,
	radius: ($('#searchRadius option:selected').val() * 1609)
};

navigator.geolocation.getCurrentPosition(function(position) {
	loc.userLat = position.coords.latitude;
	loc.userLong = position.coords.longitude;
	initMap();
})

navigator.geolocation.getCurrentPosition(function(position) {
	loc.userLat = position.coords.latitude;
	loc.userLong = position.coords.longitude;
	initBarMap();
})

$('#searchSubmit').click(function(){
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/bar/search',
		data: loc,
		success: function(response){
			barLoc.lat = response.location.latitude;
			barLoc.long = response.location.longitude;
			barLoc.address = response.address;
			window.location = "http://localhost:3000/bar/assignment/" + response._id
		}
	})
})

var roundLoc = function(point){
	return (Math.round(point*10000))/10000
}

$('#checkInBut').click(function(){
	if(roundLoc(loc.userLat) === roundLoc(barLoc.lat) && roundLoc(loc.userLong) === roundLoc(barLoc.long)){
		window.location = "http://localhost:3000/bar/search"
	}else{
		alert('Visit the bar!')
	}
})

//add map to search and assignment pages

//map on search page with user's location
function initMap() {
	var browserLoc = {lat: loc.userLat, lng: loc.userLong};
	var userMarker = "/img/blue-dot.png";
  var map = new google.maps.Map(document.getElementById('searchMap'), {
    center: {lat: loc.userLat, lng: loc.userLong},
    zoom: 15
  });
	var marker = new google.maps.Marker({
		position: browserLoc,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: userMarker
	});
}

var barLoc = {
	lat: Number($('#barLat').val()),
	long: Number($('#barLong').val())
};

//map on assignment page with bar location
function initBarMap() {
  var map = new google.maps.Map(document.getElementById('assignmentMap'), {
    center: {lat: barLoc.lat, lng: barLoc.long},
    zoom: 15
  });
	var marker = new google.maps.Marker({
		position: barLoc,
		map: map
	});
	console.log(barLoc);
}
