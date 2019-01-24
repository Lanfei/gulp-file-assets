# gulp-file-assets · [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Version][version-image]][version-url] [![License][license-image]][license-url]

> A gulp plugin to extract file assets.

**Attention: Version 2.0.0+ is not compatible with 1.0.0+.**

## Usage

First, install `gulp-file-assets` as a development dependency:

```shell
$ npm install --save-dev gulp-file-assets
```

Then, add it to your `gulpfile.js`:

```js
var gulp = require('gulp');
var fileAssets = require('gulp-file-assets');

gulp.task('default', function(){
	return gulp
		.src('index.html')
		.pipe(fileAssets())
		.pipe(gulp.dest('dist'));
});
```

**Notice: If your source files are in a folder, please set the `base` option of `gulp.src(options)` to a right path.**

## Example

### index.html

```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>gulp-file-assets</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<a href="sample.html">Link</a>
</body>
</html>
```

### style.css

```css
#logo {
	background: url(../img/logo.png);
}
```

### gulpfile.js

```js
var gulp = require('gulp');
var fileAssets = require('gulp-file-assets');

gulp.task('default', function() {
	return gulp
		.src('index.html')
		.pipe(fileAssets({
			excludes: ['html']
		}))
		.pipe(gulp.dest('dist'));
});
// => ['dist/index.html', 'dist/css/style.css', 'dist/img/logo.png']
```

## API

### fileAssets(options)

#### options

Type: `Object`

##### options.exts

File extensions to be extracted.

Type: `Array`

Default:
```js
[
	'js', 'css', 'html', 'tpl',
	'jpg', 'jpeg', 'png', 'gif', 'svg', 'webp',
	'ttf', 'eot', 'otf', 'woff'
]
```
##### options.excludes

File extensions to be excluded.

Type: `Array`

Default: `[]`

##### options.includeSrc

Whether to put the source files to the pipeline.

Type: `Boolean`

Default: `true`

##### options.depth

The depth of files to extract.

Type: `Number`

Default: `null`

##### options.ignores

A file path/RegExp list to be ignored.

Type: `Array`

Default: `[]`

[build-url]: https://circleci.com/gh/Lanfei/gulp-file-assets
[build-image]: https://img.shields.io/circleci/project/github/Lanfei/gulp-file-assets.svg
[coverage-url]: https://codecov.io/github/Lanfei/gulp-file-assets
[coverage-image]: https://img.shields.io/codecov/c/github/Lanfei/gulp-file-assets.svg
[version-url]: https://npmjs.org/package/gulp-file-assets
[version-image]: https://img.shields.io/npm/v/gulp-file-assets.svg
[license-url]: https://github.com/Lanfei/gulp-file-assets/blob/master/LICENSE
[license-image]: https://img.shields.io/npm/l/gulp-file-assets.svg
