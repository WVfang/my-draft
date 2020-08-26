"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		return gulp.src(other.config.from, {base: other.config.base})
			.pipe(gulp.dest(other.config.dest));

	};
	
};