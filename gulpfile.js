const gulp = require('gulp');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('test-transpile-test', () => {
    return gulp.src('test/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('distTest/test'));
});

gulp.task('test-transpile-src', () => {
    return gulp.src('src/**/*.js')
		.pipe(babel({
            presets: ['es2015']
		}))
		.pipe(gulp.dest('distTest/src'));
});

gulp.task(
    'test',
    [
        'test-transpile-test',
        'test-transpile-src'
    ],
    () => {
        return gulp.src('distTest/test/**/*.js')
        .pipe(mocha({
            reporter: 'nyan'
        }));
    }
);
