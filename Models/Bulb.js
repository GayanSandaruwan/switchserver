var mongoose = require('mongoose');

var bulbSchema = new mongoose.Schema(
{
	bulb : Number,
	key : String,
	state : Boolean,
	Name : String,
}
	);

module.exports = mongoose.model('Bulb', bulbSchema);
