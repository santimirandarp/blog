const path = require('path');
const {src,dest,watch,series,parallel} = require("gulp")
const imagemin = require("gulp-imagemin")
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');


function cleanFilename(filename, extension){
    //spaces with underscore and ' or " with nothing
    filename = filename.replace('/\s+/g','_').replace('/[\'\"]/g','')
      //lowercase the extension
      extension = extension.toLowerCase()
      return filename, extension
  } 

//path
const tpath = {
src:{ js:'public/src/javascripts/**/*',
      images:'public/src/images/**/*.{png,PNG,svg,jpg,jpeg,JPG,JPEG}',
      scss:'public/src/stylesheets/**/*.scss',
      routes:'routes/*.js',
      views:'views/**/*.ejs',
    },
dest:{
js:'public/dist/javascripts/',
   images:'public/dist/images/',
   scss:'public/dist/stylesheets/',
     }}

function genCSS() {
  //compiles scss and builds a source map useful for debugging in browser
  //this finds a line in css, and maps it to the source (file and line).
  return src(tpath.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    // dest will be a single index.css file, and some from folders (blog, about, etc).
    .pipe(dest(tpath.dest.scss))
};

function minify(){
  // minify jpg, png, svg images; 
  //replace whitespace with underscore
  //improve the extension (all lowercase)
  // move them to dist folder

  return src(tpath.src.images)
    .pipe( imagemin([
          //imagemin.gifsicle({interlaced: true}),
          imagemin.mozjpeg({quality: 75, progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({ plugins: [ {removeViewBox: true}, {cleanupIDs: false} ] })
    ]))
    .pipe(rename(function (path) {
          path.basename, path.extname = cleanFilename(path.basename, path.extname)
          }))
  .pipe(dest(tpath.dest.images))
}

function js(){ 
  //just copy the js files from src over to dest
  return src(tpath.src.js).pipe(dest(tpath.dest.js)) 
}

function watcher (cb) {
// nodemon
   const stream = nodemon({
script: './bin/www' , 
ext: 'js scss ejs',
ignore: [ 'public/dist/', 'node_modules/' ],
watch:    [tpath.src.js, tpath.src.scss, tpath.src.routes, tpath.src.views],
tasks: function (changedFiles) {
var tasks = []
if (!changedFiles) return tasks;
changedFiles.forEach(function (file) {
    if (path.extname(file) === '.js' && !~tasks.indexOf('js')) tasks.push('js')
    if (path.extname(file) === '.scss' && !~tasks.indexOf('genCSS')) tasks.push('genCSS')
    })
return tasks } })      
    .on('restart', function () {
        console.log('restarted!')
        })
  .on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10)  // restart the server in 10 seconds
      })
cb()
}

exports.minify = minify
exports.genCSS = genCSS
  exports.js = js
exports.default = series(parallel(genCSS,js), watcher)

