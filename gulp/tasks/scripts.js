"use strict";

// Solving require.extensions.hasOwnproperty is not a function
// https://github.com/aseemk/requireDir/pull/46/files

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		// var queue = other.config.bundles.length;
		//
		// var buildThis = function(bundle) {
		//
		// 	var build = function() {
		//
		// 		return (
		//
		// 			gulp.src([other.config.src + "**/*.js"])
		// 				.pipe(plugins.if(bundle.compress && devBuild, plugins.sourcemaps.init({loadMaps: true})))
		// 				.pipe(plugins.if(bundle.compress, plugins.uglify()))
		// 				.pipe(plugins.concat(bundle.destFile))
		// 				.pipe(plugins.if(bundle.compress && devBuild, plugins.sourcemaps.write('./')))
		// 				.pipe(plugins.if(bundle.compress, plugins.rename({suffix: '.min'})))
		// 				.pipe(gulp.dest(bundle.dest))
		// 				.on('end', handleQueue)
		// 				.pipe(other.reload({ stream: true }))
		//
		// 		);
		// 	};
		//
		// 	var handleQueue = function() {
		//
		// 		other.notifier(bundle.destFile);
		// 		if(queue) {
		// 			queue--;
		// 			if(queue === 0) cb();
		// 		}
		//
		// 	};
		//
		// 	return build();
		// };
		//
		// other.config.bundles.forEach(buildThis);

		gulp.src(other.finder(other.config.src))
            .pipe(plugins.plumber())
			.pipe(plugins.if(devBuild, plugins.changed(other.config.dest)))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(other.config.dest))
			.on('end', function(){
				other.notifier('Scripts');
				cb();
			})
			.pipe(other.reload({ stream: true }));

	};

};
