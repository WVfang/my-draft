"use strict";

module.exports = function(bundles, _dirSrc, _dirType, _publicDir) {

	function makeBuild(bundle) {
		var type 		= _dirType.replace('/', ''),
			src  		= _dirSrc + _dirType,
			srcFile 	= bundle.name + "." + (type === 'css' ? 'scss' : type),
			dest 		= _publicDir + _dirType,
			destFile 	= bundle.name + "." + type;

		return {
			src: src + srcFile,
			dest: dest,
			destFile: destFile,
			compress: bundle.compress
		};
	}

	var pack = [];

	for(var i = 0; i < bundles.length; i++) {
		pack.push(makeBuild(bundles[i]))
	}

	return pack;

}