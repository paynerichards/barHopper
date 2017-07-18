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
		url: '../user/register',
		data: newUser,
		success: function(response){
			window.location = "../bar/search";
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
		url: '../user/login',
		data: userInfo,
		success: function(response){
			window.location = "../bar/search"
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
		url: '../bar/search',
		data: loc,
		success: function(response){
			barLoc.lat = response.location.latitude;
			barLoc.long = response.location.longitude;
			barLoc.address = response.address;
			window.location = "../bar/assignment/" + response._id
		}
	})
})

var roundLoc = function(point){
	return (Math.round(point*10000))/10000
}

$('#checkInBut').click(function(){
	checkLoc ={
		userLat: 0,
		userLong: 0
	}
	navigator.geolocation.getCurrentPosition(function(position){
		checkLoc.userLat = position.coords.latitude
		checkLoc.userLong = position.coords.longitude
	})
	
	if(roundLoc(checkLoc.userLat) === roundLoc(barLoc.lat) && roundLoc(checkLoc.userLong) === roundLoc(barLoc.long)){
		window.location = "../bar/search"
	}else{
		alert('Visit the bar!')
	}
})

//add map to search and assignment pages
var userMarker = "/img/blue-dot.png";

//map on search page with user's location
function initMap() {
	var browserLoc = {lat: loc.userLat, lng: loc.userLong};
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
	var marker = new google.maps.Marker();
	marker.setPosition(new google.maps.LatLng(barLoc.lat, barLoc.long));
	marker.setMap(map);
}
