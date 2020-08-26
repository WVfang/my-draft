"use strict";

// var requireDir = require('require-dir');

global.devBuild = process.env.NODE_ENV === 'development';
console.log("Mode: " + process.env.NODE_ENV + "\n");

// requireDir('./gulp/tasks', {recurse: true});

var gulp		= require('gulp'),
	plugins		= require('gulp-load-plugins')(),
	gulpsync	= require('gulp-sync')(gulp);

var notifier 	= require('./gulp/helpers/notifier'),
	finder		= require('./gulp/helpers/finder'),
	del 		= require('del'),
	stream		= require('map-stream'),
	config		= require('./gulp/config');

var browserSync = require('browser-sync'),
	reload 		= browserSync.reload; // .pipe(other.reload({ stream: true }))



gulp.task('html', getTask('html', { "notifier": notifier, "config": config.html, "reload": reload }));
gulp.task('css', getTask('css', { "notifier": notifier, "config": config.css, "reload": reload }));
gulp.task('scripts', getTask('scripts', { "notifier": notifier, "finder": finder, "config": config.scripts, "reload": reload }));
gulp.task('images', getTask('images', { "notifier": notifier, "config": config.img, "finder": finder }));

gulp.task('clean', getTask('clean', { "config": config.clean, "del": del }));
gulp.task('copy', getTask('copy', { "config": config.copy }));
// gulp.task('webserver', getTask('webserver', { "config": config.server }));
// gulp.task('webserver', getTask('webserver', { "browserSync": browserSync }));
gulp.task('webserver', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		},
		tunnel: false,
		host: 'localhost',
		port: 9000,
		logPrefix: 'Frontend_Devil'
	});
});
gulp.task('watching', function() {
	global.isWatching = true;
});



// gulp.task('watch', ['watching', 'build'], getTask('watch', { "config": config, "finder": finder }));
gulp.task('watch', ['watching', 'build'], function() {

	gulp.watch(finder(config.html.src + "**/*"), ['html']);
	gulp.watch(finder(config.css.src + "**/*"), ['css']);
	gulp.watch(finder(config.img.src + "**/*"), ['images']);
	gulp.watch(finder(config.scripts.src + "**/*"), ['scripts']);

});

gulp.task('build', gulpsync.sync(['clean', 'bundle']));

gulp.task('bundle', gulpsync.sync(['html', 'css', 'scripts', 'images', 'copy', 'webserver']), function() {
	if(devBuild) global.doBeep = true;
});



gulp.task('default', ['watch']);



function getTask(task, other) {
	return require('./gulp/tasks/' + task)(gulp, plugins, other);
}
