var mongoose = require('mongoose');

var BarSchema = new mongoose.Schema({
	name: String,
	location: {
		type: { type: String },
		coordinates: [Number]
	}
})

var barModel = mongoose.model('Bar', BarSchema);

module.exports = barModel