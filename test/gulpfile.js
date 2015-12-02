var gulp = require('gulp');
var fileAssets = require('../');

gulp.task('default', function () {
	return gulp
		.src(['fixtures/index.html'], {
			base: 'fixtures'
		})
		.pipe(fileAssets({
			ignores: [/\.(html|tpl)$/]
		}))
		.pipe(gulp.dest('build'));
});
