let gulp = require('gulp'),
    extReplace = require('gulp-ext-replace'),
    less = require('gulp-less'),
    clean = require('gulp-clean-css');

gulp.task('build-css', function () {
    return gulp.src('./src/bundles/*.decl.less')
        .pipe(less())
        .pipe(extReplace('.css', '.decl.css'))
        .pipe(gulp.dest('./src/bundles'))
        .pipe(clean())
        .pipe(extReplace('.min.css', '.css'))
        .pipe(gulp.dest('./src/bundles'));
});

gulp.task('watch', function () {
    gulp.watch('./src/bundles/*.decl.less', ['build-css']);
});
