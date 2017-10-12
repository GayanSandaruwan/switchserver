var mongoose = require('mongoose');

var user_switch_Schema = new mongoose.Schema(
{
	User : String,
	switches : [],
}
	);

module.exports = mongoose.model('User_switch', user_switch_Schema);
