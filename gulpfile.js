var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  coffee = require('gulp-coffee'),
  coffeelint = require('gulp-coffeelint'),
  concat = require('gulp-concat'),
  inlinesource = require('gulp-inline-source'),
  jade = require('gulp-jade'),
  livereload = require('gulp-livereload'),
  minifyHTML = require('gulp-minify-html'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  uglifycss = require('gulp-uglifycss');

gulp.task('build-style', function() {
	return sass('src/style/', {style: 'expanded'})
    .pipe(concat('main.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/style/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglifycss())
    .pipe(gulp.dest('build/style/'))
})

gulp.task('build-html', function() {
  return gulp.src('src/index.jade')
    .pipe(jade({
      pretty: '\t'
    }))
    .pipe(gulp.dest('build/'))
})

gulp.task('build-script', function() {
  return gulp.src('src/script/*.coffee')
    .pipe(coffeelint({
      max_line_length: {
        value: 100000
      },
      no_backticks: {
        level: 'ignore',
        vaule: false
      }
    }))
    .pipe(coffeelint.reporter())
    .pipe(coffee({bare: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/script/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(notify('Runnig the build task'))
    .pipe(gulp.dest('build/script/'))
})

gulp.task('build', function() {
  runSequence(['build-style', 'build-script', 'build-html'])
  notify('Runnig the build task')
  //gulp.src('build/*.html').pipe(livereload())
});

gulp.task('production', function() {
  runSequence(['build-style', 'build-script', 'build-html'], function() {
    gulp.src('build/*.html')
      .pipe(inlinesource())
      .pipe(minifyHTML())
      .pipe(gulp.dest('production/'))
  })
});

gulp.task('watch', function() {
  runSequence('build')
  livereload.listen()
  gulp.watch('src/**/*', ['build'])
})

gulp.task('default', function() {
  runSequence('watch')
})