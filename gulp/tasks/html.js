"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		gulp.src(other.config.src + "*.pug")
            .pipe(plugins.plumber())
			.pipe(plugins.if(devBuild, plugins.changed(other.config.dest)))
			.pipe(plugins.filter(function(file) {
				return !/\/_/.test(file.path) || !/^_/.test(file.relative);
			}))
			.pipe(plugins.pug({pretty: true}))
			.pipe(gulp.dest(other.config.dest))
			.on('end', function() {
				other.notifier('html');
				cb();
			})
			.pipe(other.reload({ stream: true }))

	};

};
