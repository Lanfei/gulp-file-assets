'use strict';

var gulp = require('gulp');
var through = require('through2');
var fileAssets = require('../');

describe('gulp-file-assets', function () {
	it('should exact all assets in the file', function (done) {
		var count = 0;
		var results = [
			'index.html',
			'html/index.html',
			'css/style.css',
			'css/inner.css',
			'img/avatar1.jpg',
			'img/avatar2.jpg',
			'img/avatar3.jpg',
			'img/avatar4.jpg',
			'js/script.js',
			'js/inner.js'
		];
		gulp.src(['test/fixtures/index.html'], {base: 'test/fixtures'})
			.pipe(fileAssets())
			.pipe(through.obj(function (file, enc, cb) {
				assert.include(results, file.relative);
				++count;
				cb();
			}, function () {
				assert.strictEqual(count, results.length);
				done();
			}));
	});

	it('should only extract assets by offering depth', function (done) {
		var count = 0;
		var results = [
			'index.html',
			'html/index.html',
			'css/style.css',
			'img/avatar3.jpg',
			'js/script.js'
		];
		gulp.src(['test/fixtures/index.html'], {base: 'test/fixtures'})
			.pipe(fileAssets({
				depth: 1
			}))
			.pipe(through.obj(function (file, enc, cb) {
				assert.include(results, file.relative);
				++count;
				cb();
			}, function () {
				assert.strictEqual(count, results.length);
				done();
			}));
	});

	it('should not include source files', function (done) {
		var count = 0;
		var results = [
			'css/style.css',
			'css/inner.css',
			'img/avatar1.jpg',
			'img/avatar2.jpg',
			'img/avatar3.jpg',
			'img/avatar4.jpg',
			'js/script.js',
			'js/inner.js'
		];
		gulp.src(['test/fixtures/html/index.html'], {base: 'test/fixtures'})
			.pipe(fileAssets({
				includeSrc: false
			}))
			.pipe(through.obj(function (file, enc, cb) {
				assert.include(results, file.relative);
				++count;
				cb();
			}, function () {
				assert.strictEqual(count, results.length);
				done();
			}));
	});

	it('should ignore image assets', function (done) {
		var count = 0;
		var results = [
			'index.html',
			'html/index.html',
			'css/style.css',
			'css/inner.css',
			'js/script.js',
			'js/inner.js'
		];
		gulp.src(['test/fixtures/index.html', 'test/fixtures/html/index.html'], {base: 'test/fixtures'})
			.pipe(fileAssets({
				excludes: ['jpg', 'png', 'gif']
			}))
			.pipe(through.obj(function (file, enc, cb) {
				assert.include(results, file.relative);
				++count;
				cb();
			}, function () {
				assert.strictEqual(count, results.length);
				done();
			}));
	});

	it('should ignore inner.css and assets in it', function (done) {
		var count = 0;
		var results = [
			'index.html',
			'html/index.html',
			'css/style.css',
			'js/script.js',
			'js/inner.js'
		];
		gulp.src(['test/fixtures/index.html', 'test/fixtures/html/index.html'], {base: 'test/fixtures'})
			.pipe(fileAssets({
				ignores: [
					'test/fixtures/css/inner.css',
					/^.*\.jpg$/
				]
			}))
			.pipe(through.obj(function (file, enc, cb) {
				assert.include(results, file.relative);
				++count;
				cb();
			}, function () {
				assert.strictEqual(count, results.length);
				done();
			}));
	});
});
