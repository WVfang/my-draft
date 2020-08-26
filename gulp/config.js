"use strict";

var pkg 	= require('../package.json'),
	bundler	= require('./helpers/bundler');

var _src 	= "./src/",
	_public = "./public/";

var html	= "html/",
	css		= "css/",
	js		= "js/",
	img		= "images/";

var bundles = [
	{
		name: 'app',
		compress: true
	}
];

module.exports	= {

	server: {
		app: _public
	},

	html: {
		src: _src + html,
		dest: _public
	},

	css: {
		src: _src + css,
		bundles: bundler(bundles, _src, css, _public),
		autoprefixer: ['> 1%', 'last 2 versions']
	},

	scripts: {
		src: _src + js,
		dest: _public + js,
		bundles: bundler(bundles, _src, js, _public),
		extensions: [],
		lint: {
			options: pkg.lintOptions,
			dir: _src + js
		}
	},

	img: {
		src: _src + img,
		dest: _public + img,
		imagemin: {}
	},

	copy: {
		base: _src,
		from: [
			_src + "fonts/**/*",
			_src + "libs/**/*",
			_src + "svg/**/*"
		],
		dest: _public
	},

	clean: {
		dest: _public
	}

};
