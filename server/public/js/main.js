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
})