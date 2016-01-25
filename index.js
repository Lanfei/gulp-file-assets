'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

const PLUGIN_NAME = 'gulp-file-assets';

const EXT_RE = /.*\.(\w+)/;
const ASSETS_RE = /([^'"# \(\)\?]+\.(EXT))\b/ig;

var defTypes = {
	js: ['js'],
	css: ['css'],
	page: ['html', 'tpl'],
	img: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
	font: ['ttf', 'eot', 'otf', 'woff']
};

function merge(target, /** ..., **/ objects) {
	target = target || {};
	for (var i = 1, l = arguments.length; i < l; ++i) {
		var object = arguments[i];
		if (object) {
			var keys = Object.keys(object);
			for (var j = 0, m = keys.length; j < m; ++j) {
				var key = keys[j];
				target[key] = object[key];
			}
		}
	}
	return target;
}

function getFileType(types, file) {
	var ext = getFileExt(file);
	var keys = Object.keys(types);
	for (var i = 0, l = keys.length; i < l; ++i) {
		var key = keys[i];
		if (types[key].indexOf(ext) >= 0) {
			return key;
		}
	}
	return null;
}

function getFileExt(file) {
	var filename;
	if (file instanceof Object) {
		filename = file.relative || file.path;
	} else {
		filename = file;
	}
	return filename.replace(EXT_RE, '$1').toLowerCase();
}

function getAvailableExts(types) {
	var exts = [];
	var keys = Object.keys(types);
	for (var i = 0, l = keys.length; i < l; ++i) {
		var key = keys[i];
		exts = exts.concat(types[key]);
	}
	return exts;
}

function getAbsolutePath(filename) {
	if (!path.isAbsolute(filename)) {
		filename = path.join(process.cwd(), filename);
	}
	return filename;
}

function isLocal(url) {
	return !/^(https?:)?\/\//.test(url);
}

function isIgnored(ignores, filename) {
	for (var i = 0, l = ignores.length; i < l; ++i) {
		var item = ignores[i];
		if (item instanceof RegExp) {
			if (item.test(filename)) {
				return true;
			}
		} else if (item === filename) {
			return true;
		}
	}
	return false;
}

function parseAssets(file, pattern, types, ignores, cb) {
	var type = getFileType(types, file);
	if (!type) {
		return;
	}
	ignores.push(file.path);
	gutil.log(PLUGIN_NAME + ':', 'Extract', gutil.colors.green(file.relative));
	if (type === 'js' || type === 'css' || type === 'page') {
		var code = file.contents.toString();
		code.replace(pattern, function ($, url) {
			if (!isLocal(url)) {
				return;
			}
			var files = [
				getAbsolutePath(path.join(file.base, url)),
				getAbsolutePath(path.join(path.dirname(file.path), url))
			];
			if (files[0] === files[1]) {
				files.pop();
			}
			for (var i = 0, l = files.length; i < l; ++i) {
				var filename = files[i];
				if (!isIgnored(ignores, filename) && fs.existsSync(filename)) {
					var asset = new gutil.File({
						path: filename,
						base: file.base,
						contents: fs.readFileSync(filename)
					});
					parseAssets(asset, pattern, types, ignores, cb);
				}
			}
		});
	}
	cb(file);
}

function fileAssets(opts) {
	opts = opts || {};
	var types = merge({}, defTypes, opts['types']);
	var exts = getAvailableExts(types);
	var pattern = new RegExp(ASSETS_RE.source.replace('EXT', exts.join('|')), 'ig');
	var ignores = opts['ignores'];

	if (ignores) {
		ignores = ignores.concat();
		for (var i = 0, l = ignores.length; i < l; ++i) {
			var item = ignores[i];
			if (!(item instanceof RegExp)) {
				ignores[i] = getAbsolutePath(item);
			}
		}
	} else {
		ignores = [];
	}

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			return cb();
		} else if (file.isStream()) {
			cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		} else if (file.isBuffer()) {
			parseAssets(file, pattern, types, ignores, this.push.bind(this));
			cb();
		}
	});
}

module.exports = fileAssets;
