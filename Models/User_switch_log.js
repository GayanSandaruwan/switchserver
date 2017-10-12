var mongoose = require('mongoose');

var user_switch_log_Schema = new mongoose.Schema(
{
	User : String,
	switch : [],
	status : String,
}
	);

module.exports = mongoose.model('User_switch_log', user_switch_log_Schema);
