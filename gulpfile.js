/**
 * Created by shin on 16/4/6.
 * Created by shin
 */
var gulp = require('gulp');
//var uglify=require('gulp-uglify'),//混淆插件 //基础库
imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    //server = tinylr();
    port = 35729,
    gulp.task('default', function () {
         /*gulp.src('js/FaceTouch.js').
    pipe(uglify()).
    pipe(gulp.dest('build'));*/
});

    //压缩并合并js
gulp.task('js',function( ){
        var jsSrc = 'lib/*.js';
        var jsDst= 'lib/';
    gulp.src(jsSrc)

        /*.pipe(concat('main.js'))//合并为main.js*/
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

//图片的压缩合并
gulp.task('images' , function(){
    var imgSrc = 'images/*.jpg',
        imgDst = '../pu/images';
        gulp.src(imgSrc)
        .pipe(imagemin())
        //.pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});


gulp.task('css', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});


gulp.task( 'html', function() {
    var htmlSrc = './src/*.html',
        htmlDst =
    './dist/';
        gulp.
        src(htmlSrc)
      //  .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst)) ;
}); gulp. task('minify',function(){
    gulp.src('js/FaceTouch.js').
        pipe(uglify()).
        pipe(gulp.dest('build'));
});