'use strict';

var gulp = require('gulp');
var should = require('should');
var through = require('through2');
var fileAssets = require('../');

describe('gulp-file-assets', function () {
	it('should find all assets in the file', function (done) {
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
		gulp.src([
				'test/fixtures/index.html',
				'test/fixtures/html/index.html'
			], {
				base: 'test/fixtures'
			})
			.pipe(fileAssets({
				ignores: [/\.(html|tpl)$/]
			}))
			.pipe(through.obj(function (file, enc, cb) {
				file.relative.should.equalOneOf(results);
				++count;
				cb();
			}, function () {
				count.should.equal(results.length);
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
		gulp.src([
				'test/fixtures/index.html',
				'test/fixtures/html/index.html'
			], {
				base: 'test/fixtures'
			})
			.pipe(fileAssets({
				types: {
					img: null
				},
				ignores: [/\.(html|tpl)$/]
			}))
			.pipe(through.obj(function (file, enc, cb) {
				file.relative.should.equalOneOf(results);
				++count;
				cb();
			}, function () {
				count.should.equal(results.length);
				done();
			}));
	});

	it('should ignore inner.css and assets in it', function (done) {
		var count = 0;
		var results = [
			'index.html',
			'html/index.html',
			'css/style.css',
			'img/avatar1.jpg',
			'img/avatar3.jpg',
			'img/avatar4.jpg',
			'js/script.js',
			'js/inner.js'
		];
		gulp.src([
				'test/fixtures/index.html',
				'test/fixtures/html/index.html'
			], {
				base: 'test/fixtures'
			})
			.pipe(fileAssets({
				ignores: [
					/\.(html|tpl)$/,
					'test/fixtures/css/inner.css'
				]
			}))
			.pipe(through.obj(function (file, enc, cb) {
				file.relative.should.equalOneOf(results);
				++count;
				cb();
			}, function () {
				count.should.equal(results.length);
				done();
			}));
	});
});
