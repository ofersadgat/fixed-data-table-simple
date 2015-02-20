var gulp         = require('gulp');
var browserify   = require('gulp-browserify');
var concat       = require('gulp-concat');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var jshint       = require('gulp-jshint');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var notify       = require('gulp-notify');
var cache        = require('gulp-cache');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');
var del          = require('del');

// Static server
gulp.task('browser-sync', function() {
    browserSync({
    	notify: false,
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('browserify', function(){
	return gulp.src('src/js/main.jsx')
				.pipe(plumber())
				.pipe(browserify({transform: 'reactify'}))
				.pipe(concat('table.js'))
				.pipe(plumber.stop())
				.pipe(gulp.dest('dist/js'));
})

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
				.pipe(jshint('.jshintrc'))
				.pipe(jshint.reporter('default'))
				.pipe(concat('main.js'))
				.pipe(gulp.dest('dist/assets/js'))
				.pipe(rename({suffix: '.min'}))
				.pipe(uglify())
				.pipe(gulp.dest('dist/assets/js'))
				.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('css', function() {
	return gulp.src('src/css/*')
				.pipe(plumber())
				.pipe(sass({ errLogToConsole: true }))
				.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
				.pipe(concat('style.css'))
				.pipe(gulp.dest('dist/css'))
				.pipe(rename({suffix: '.min'}))
				.pipe(minifycss())
				.pipe(plumber.stop())
				.pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function(cb) {
	del(['dist'], cb)
});

gulp.task('html', function(){
	return gulp.src('src/index.html')
				.pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
	return gulp.src('src/images/*')
				.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function(){
	return gulp.src('src/fonts/*')
				.pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['browserify', 'css', 'images', 'fonts', 'html']);

gulp.task('watch', ['browser-sync'], function () {
	
	gulp.watch('src/**/*.*', ['default', browserSync.reload]);
});


