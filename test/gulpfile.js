var gulp = require('gulp');
var fileAssets = require('../');

gulp.task('default', function () {
	return gulp
		.src(['fixtures/index.html', 'fixtures/html/index.html'], {
			base: 'fixtures'
		})
		.pipe(fileAssets())
		.pipe(gulp.dest('build'));
});
