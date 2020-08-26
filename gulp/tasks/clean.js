"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		return other.del([].concat(other.config.dest + "**/*"), cb);
		
	};

};