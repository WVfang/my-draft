"use strict";

var gutil		= require('gulp-util'),
	notifier	= require('node-notifier');

module.exports = function(file, isFail, message) {

	var message = message || "Bundled!",
		color 	= isFail ? 'red' : 'green',
		icon 	= isFail ? '' : false;

	if(global.doBeep) {
		notifier.notify({
			'title': 'Report',
			'message': message,
			'icon': icon,
			'sound': true
		});
	}

	gutil.log(message, gutil.colors[color](file));
}