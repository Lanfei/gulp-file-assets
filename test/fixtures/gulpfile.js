var gulp = require('gulp');
var fileAssets = require('../../');

gulp.task('default', function () {
	return gulp
		.src(['index.html', 'html/index.html'], {
			base: '.'
		})
		.pipe(fileAssets({
			ignores: [/\.(html|tpl)$/]
		}))
		.pipe(gulp.dest('build'));
});
