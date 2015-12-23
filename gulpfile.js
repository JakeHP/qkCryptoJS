require('babel-core/register');
const gulp = require('gulp');
const jscs = require('gulp-jscs');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const isparta = require('isparta');
const coveralls = require('gulp-coveralls');

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('coveralls-coverage', function () {
    return gulp.src(['src/**/*.js'])
    .pipe(istanbul({
        instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('coveralls-report', ['coveralls-coverage'], function () {
    return gulp.src(['test/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [
            'lcovonly'
        ],
        reportOpts: { dir: './coverage' }
    }));
});

gulp.task('coveralls', ['coveralls-report'], function () {
    return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});
