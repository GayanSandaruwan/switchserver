var mongoose = require('mongoose');

var bulb_group_Schema = new mongoose.Schema(
{
	switch : String,
	bulbs : [],
	switchName : String,
}
	);

module.exports = mongoose.model('Bulb_group', bulb_group_Schema);
