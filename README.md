# gulp-file-assets [![NPM version][npm-image]][npm-url]

> A gulp plugin to extract file assets.

## Usage

First, install `gulp-file-assets` as a development dependency:

```shell
$ npm install --save-dev gulp-file-assets
```

Then, add it to your `gulpfile.js`:

```js
var fileAssets = require('gulp-file-assets');

gulp.task('default', function(){
  gulp.src('index.html')
    .pipe(fileAssets())
    .pipe(gulp.dest('build'));
});
```

**Notice: If your source files are in a folder, please set the `base` option of `gulp.src(options)` to a right path.**

## API

### fileAssets(options)

#### options
Type: `Object`

##### options.types

Asset types to be extracted.

Type: `Object`
Default:
```js
{
	js: ['js'],
	css: ['css'],
	page: ['html', 'tpl'],
	img: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
}
```

You can also extend by yourself:

```js
{
	text: ['md', 'txt']
}
```

##### options.ignores

A path list to ignore.

Type: `Array`
Default: `[]`

[npm-url]: https://npmjs.org/package/gulp-file-assets
[npm-image]: https://badge.fury.io/js/gulp-file-assets.svg
