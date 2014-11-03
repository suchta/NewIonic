var gulp = require('gulp');

var clean = require('gulp-rimraf');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

var bases = {
    app: './www/',
    dist: 'dist/'
};
var paths = {
    sass: ['./www/lib/ionic/scss/**/*.scss'],
    js: ['./www/js/**/*.js'],
    libs: ['./www/lib/ionic/js/*.min.js'],
    styles: ['./www/css/*.css', './www/lib/ionic/css/*.css'],
    images: ['./www/img/**/*.png'],
    html: ['index.html', './www/templates/*.html']

};
// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(clean());
});


// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
    gulp.src(paths.js)
        //.pipe(eslint())
        //.pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(bases.dist + 'js/'));
});

// Imagemin images and ouput them in dist
gulp.task('imagemin', ['clean'], function() {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + "img/"));
});

// Copy all other files to dist directly
gulp.task('copy', ['clean'], function() {
    // Copy html
    gulp.src(paths.html)
        .pipe(gulp.dest(bases.dist));
});

// Copy styles
    gulp.src(paths.styles)
        .pipe(gulp.dest(bases.dist + 'css/'));

// Copy lib scripts, maintaining the original directory structure
    gulp.src(paths.libs)
        .pipe(gulp.dest(bases.dist + 'lib/'));

    gulp.task('sass', function (done) {
        gulp.src('./lib/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./www/css/'))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('./www/css/'))
            .on('end', done);
    });

    gulp.task('watch', function () {
        gulp.watch(paths.sass, ['sass']);
        gulp.watch(paths.js, ['lint']);
    });

    gulp.task('install', ['git-check'], function () {
        return bower.commands.install()
            .on('log', function (data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
    });

    gulp.task('git-check', function (done) {
        if (!sh.which('git')) {
            console.log(
                    '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                    '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }
        done();
    });

    gulp.task('lint', function () {
        gulp.src(['./www/js/**/*.js'])
            .pipe(eslint())
            .pipe(eslint.format());
    });
gulp.task('default', ['clean', 'scripts', 'imagemin', 'copy', 'sass']);
