let gulp = require('gulp'),
    extReplace = require('gulp-ext-replace'),
    less = require('gulp-less'),
    clean = require('gulp-clean-css')
    inlineAssets = require('gulp-inline-assets');
let browserify = require('browserify'),
    glob = require('glob'),
    vinyl = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    eventStream = require('event-stream'),
    uglify = require('gulp-uglify-es').default;

gulp.task('build-css', function () {
    return gulp.src('./src/bem/bundles/*.decl.less')
        .pipe(less())
        .pipe(extReplace('.css', '.decl.css'))
        .pipe(gulp.dest('./src/bundles'))
        .pipe(inlineAssets())
        .pipe(clean())
        .pipe(extReplace('.min.css', '.css'))
        .pipe(gulp.dest('./src/bundles'));
});

gulp.task('build-js', function (done) {
    glob('./src/bem/bundles/*.decl.js', function (err, files) {
        if (err) {
            done(err);
        }
        let tasks = files.map(function (entry) {
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(vinyl(entry))
                .pipe(vinylBuffer())
                .pipe(extReplace('.js', '.decl.js'))
                .pipe(gulp.dest('./'))
                .pipe(uglify())
                .pipe(extReplace('.min.js', '.js'))
                .pipe(gulp.dest('./'));
        });
        eventStream.merge(tasks).on('end', done);
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/bem/bundles/*.decl.less', ['build-css']);
    gulp.watch('./src/bem/blocks/*.less', ['build-css']);
    gulp.watch('./src/bem/blocks/**/*.less', ['build-css']);
    gulp.watch('./src/bem/bundles/*.decl.js', ['build-js']);
    gulp.watch('./src/bem/bundles/*.js', ['build-js']);
    gulp.watch('./src/bem/bundles/**/*.js', ['build-js']);
});
