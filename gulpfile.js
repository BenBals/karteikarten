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

gulp.task('build-style-main', function() {
	return sass('src/main/style/', {style: 'expanded'})
    .pipe(concat('main.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/main/style/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglifycss())
    .pipe(gulp.dest('build/main/style/'))
})

gulp.task('build-style-creator', function() {
  return sass('src/creator/style/', {style: 'expanded'})
    .pipe(concat('creator.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/creator/style/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglifycss())
    .pipe(gulp.dest('build/creator/style/'))
})

gulp.task('build-html-main', function() {
  return gulp.src('src/main/index.jade')
    .pipe(jade({
      pretty: '\t'
    }))
    .pipe(gulp.dest('build/main/'))
})

gulp.task('build-html-creator', function() {
  return gulp.src('src/creator/index.jade')
    .pipe(jade({
      pretty: '\t'
    }))
    .pipe(gulp.dest('build/creator/'))
})

gulp.task('build-script-main', function() {
  return gulp.src('src/main/script/*.coffee')
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
    .pipe(gulp.dest('build/main/script/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(notify('Runnig the build-main task'))
    .pipe(gulp.dest('build/main/script/'))
})

gulp.task('build-script-creator', function() {
  return gulp.src('src/creator/script/*.coffee')
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
    .pipe(gulp.dest('build/creator/script/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(notify('Runnig the build-creator task'))
    .pipe(gulp.dest('build/creator/script/'))
})

gulp.task('build-main', function() {
  runSequence(['build-style-main', 'build-script-main', 'build-html-main'])
  notify('Runnig the build-main task')
  //gulp.src('build/*.html').pipe(livereload())
});

gulp.task('build-creator', function() {
  runSequence(['build-style-creator', 'build-script-creator', 'build-html-creator'])
  notify('Runnig the build-creator task')
  //gulp.src('build/*.html').pipe(livereload())
});

gulp.task('production', function() {
  runSequence(['build-main', 'build-creator'], function() {
    gulp.src('build/main/*.html')
      .pipe(inlinesource())
      .pipe(minifyHTML())
      .pipe(gulp.dest('production/'))
    gulp.src('build/creator/*.html')
      .pipe(inlinesource())
      .pipe(minifyHTML())
      .pipe(gulp.dest('production/creator/'))
  })
});

gulp.task('watch', function() {
  runSequence('build-main', 'build-creator')
  livereload.listen()
  gulp.watch('src/main/**/*', ['build-main'])
  gulp.watch('src/creator/**/*', ['build-creator'])
})

gulp.task('default', function() {
  runSequence('watch')
})