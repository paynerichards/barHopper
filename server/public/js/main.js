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
			barLoc.lat = response.location.coordinates[0];
			barLoc.long = response.location.coordinates[1];
			barLoc.address = response.address;
			window.location = "http://localhost:3000/bar/assignment/" + response._id
		}
	})
})

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
	lat: 0.00000000,
	long: 0.00000000,
	address:"",
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
