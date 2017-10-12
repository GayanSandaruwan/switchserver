var mongoose = require('mongoose');

var bulb_switch_log_Schema = new mongoose.Schema(
	{
		switch : String,
		state : Boolean,
	},
	{
	  timestamps: true
	}
	);

module.exports = mongoose.model('Bulb_switch_log_Schema', bulb_switch_log_Schema);
