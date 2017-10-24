var mongoose = require('mongoose');

var bulbSchema = new mongoose.Schema(
{
	bulb : Number,
	state : Boolean,
	Name : String,
	user : String,
}
	);

module.exports = mongoose.model('Bulb', bulbSchema);
