var gulp = require('gulp'),
    jscs = require('gulp-jscs');

gulp.task('lint', function () {
    return gulp.src('src/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});
