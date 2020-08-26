"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		gulp.src(other.finder(other.config.src))
			.pipe(plugins.if(devBuild, plugins.changed(other.config.dest)))
			// .pipe(plugins.imagemin(other.config.imagemin))
			.pipe(gulp.dest(other.config.dest))
			.on('end', function(){
				other.notifier('Images');
				cb();
			});

	};

};
