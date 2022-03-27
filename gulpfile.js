var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles'/*nazwa taska */,function(){
	return gulp.src('assets/styles/*.css'/* ścieżka do pliku*/)
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('build'))

});
	gulp.task('watch', function(){
    gulp.watch('assets/styles/*.css'/* ścieżka do pliku*/, gulp.series(['styles'/*nazwa taska */]))
});