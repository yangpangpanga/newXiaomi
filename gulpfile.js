const gulp = require('gulp');
const sass = require('gulp-sass');
const sMaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require ('gulp-babel');
//开启一个服务器
gulp.task('webS',function(done){
    connect.server({
        root:"./dist",
        livereload:true
   
    })
    done()
})
//放置类库文件
gulp.task('res',function(){
    return gulp.src('./src/res/**')
                .pipe(gulp.dest('./dist/res'))
})
//放置img文件
gulp.task('img',function(done){
    gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'))
    .pipe(connect.reload())
    done();
})
//放置html文件
gulp.task('html',(done) => {
    gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html'))
    .pipe(connect.reload())
    done();
})
//放置css文件
gulp.task('sass',() => {
  return  gulp.src('./src/sass/*.scss')
            .pipe(sMaps.init())
            .pipe(sass({
                outputStyle:'compact'
            }))
            .pipe(sMaps.write())
            .pipe(gulp.dest('./dist/css'))
            .pipe(sass({
                outputStyle:'compressed'
            }))
            .pipe(rename({suffix:'.min'}))
            .pipe(gulp.dest('./dist/css'))
            .pipe(connect.reload())
})
//放置js文件
gulp.task('js',() => {
    return  gulp.src('./src/js/*.js')
                .pipe(babel({
                    presets: ['@babel/env']
                }))
              .pipe(gulp.dest('./dist/js'))
              .pipe(uglify())
              .pipe(rename({suffix:'.min'}))
              .pipe(gulp.dest('./dist/js'))
              .pipe(connect.reload())
  })
gulp.task('watch',function(done){
    gulp.watch('./src/html/*.html',gulp.series('html'));
    gulp.watch('./src/sass/*.scss',gulp.series('sass'));
    gulp.watch('./src/js/*.js',gulp.series('js'));
    gulp.watch('.src/img/**',gulp.series('img'));
    gulp.watch('./src/res/**',gulp.series('res'))
    done();
})
gulp.task('default',gulp.series('webS','watch'))
