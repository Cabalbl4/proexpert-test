"use strict";
const gulp = require('gulp'); 
const less = require('gulp-less');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');




const sourceLess = "./less/*.less";
const mainLess = "./less/main.less";
const sourceBabel = "./src/components/*.js";
const providersJS = "./src/providers/**/*.js";
gulp.task('babel', () => {
    console.log("compile babel");
    return gulp.src([sourceBabel])
    .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [['es2015'],[ 'react']]
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./res/js'));
});

gulp.task('providers', () => {
    console.log("compile providers");
    return gulp.src([providersJS])
    .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [['es2015']]
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./res/js/providers'));
});
 
gulp.task('less', function() {
    console.log("compile less");
    return gulp.src([mainLess])
        .pipe(less())
        .pipe(gulp.dest("./res/css"));
});

gulp.task('default', function() {
    return gulp.watch([sourceLess, sourceBabel,providersJS], ['less', 'babel', 'providers']);
});


