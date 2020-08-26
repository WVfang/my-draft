"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		gulp.watch(other.finder(other.config.html.src), ['html']);
		gulp.watch(other.finder(other.config.css.src), ['css']);
		gulp.watch(other.finder(other.config.img.src), ['images']);
		
	};

};