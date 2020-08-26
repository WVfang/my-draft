"use strict";

module.exports = function(gulp, plugins, other) {

	return function(cb) {

		var queue = other.config.bundles.length;

		var buildCSS = function(bundle) {
			var build = function() {
				return (
					gulp.src(bundle.src)
						.pipe(plugins.plumber())
						.pipe(plugins.sass())
						.pipe(plugins.autoprefixer(other.config.autoprefixer))
						.pipe(plugins.if(bundle.compress, plugins.cleanCss()))
						.pipe(plugins.if(bundle.compress, plugins.rename({suffix: '.min'})))
						.pipe(gulp.dest(bundle.dest))
						.on('end', handleQueue)
						.pipe(other.reload({ stream: true }))
				)
			}

			var handleQueue = function() {
				other.notifier(bundle.destFile);
				if(queue) {
					queue--;
					if(queue === 0) cb();
				}
			};

			return build();
		};
		
		other.config.bundles.forEach(buildCSS);

	};
	
};