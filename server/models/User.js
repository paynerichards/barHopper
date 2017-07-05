var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	loc: {
		type: { type: String },
		coordinates: [Number]
	},
	username: String,
	dob: String,
	hometown: String,
	priors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bar'}]
})

var userModel = mongoose.model('User', UserSchema);

module.exports = userModel