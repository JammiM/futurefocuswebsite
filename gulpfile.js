var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var pug         = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');

var pathToPug   = 'source/pug/*.pug';
var pathToSass  = 'source/sass/*.scss';
var pathToCss   = 'dist/css';
var pathToHtml  = 'dist/*.html';
var pathToRootFolder = './dist';

// Compile Sass
gulp.task('sass', function(){
  return gulp.src(pathToSass)
  .pipe(sass())
  .pipe(gulp.dest(pathToCss))
  .pipe(autoprefixer({
            // possible error
            // autoprefixer needs a desitination and source folder.
            browsers: ['last 2 versions'], // Add Prefixer for IE+9, Moz and Opera, Edge
            cascade: false
        }))
  .pipe(browserSync.stream());
});

// Add a css-clean and css-min after the sass is complied.
// Add html-min


// Start Browser Sync and watch for changes
gulp.task('serve', ['sass', 'pug'], function(){
  browserSync.init({
    server: pathToRootFolder
  });
  gulp.watch([pathToSass], ['sass']);
  gulp.watch([pathToPug], ['pug']);
  gulp.watch([pathToHtml]).on('change', browserSync.reload);
});

// Compile pug
gulp.task('pug',function(){
  return gulp.src(pathToPug)
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest(pathToRootFolder))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('default', ['serve']);
