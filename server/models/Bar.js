var mongoose = require('mongoose');

var BarSchema = new mongoose.Schema({
	name: String,
	yelpId: String,
	location: {
		latitude: Number,
		longitude: Number
	},
	imageUrl: String,
	address: String,
	phone: String
})

var barModel = mongoose.model('Bar', BarSchema);

module.exports = barModel