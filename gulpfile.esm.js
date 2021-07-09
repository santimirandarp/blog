import {src,lastRun, dest,watch,series,parallel} from "gulp";

import path from 'path';
import imagemin from "gulp-imagemin";
import rename from 'gulp-rename';
import nodemon from 'gulp-nodemon';
//import eslint from 'gulp-eslint';

//css
import gulpSass from 'gulp-sass';
import sassBin from 'sass';
const sass = gulpSass(sassBin);
import postcss from 'gulp-postcss';
import postcssScss from 'postcss-scss' 
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';

function cleanFilename(filename, extension){
  //spaces w underscore; ' or " with nothing; lowercase extension
    return filename.replace('/\s+/g','_').replace('/[\'\"]/g',''), extension.toLowerCase()
} 

//path
const tpath = {
src:{ public:'/src/public/',
      js:'src/**/*.js', 
      copyRest:['src/**/*', '!src/node_modules', '!src/public'], 
      images:'src/public/images/**/*.{png,svg,jpeg,jpg}', //case insensitive on src()
      scss:'src/public/stylesheets/**/*.scss',
      routes:'routes/*.js',
                      views:'views/**/*.ejs',
    },
dest:{ js:'dist/public/javascripts/',
       //'public/dist/javascripts/',
       images:'dist/public/images/',
       css:'dist/public/stylesheets/',
     }}


function genCSS(){
  return src(tpath.src.scss)
    .pipe(sourcemaps.init()) //line in css, maps to source (file & line).
    .pipe(postcss([autoprefixer()],{syntax: postcssScss}))
    .pipe(sass.sync({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(tpath.dest.css))
}

function minify(){
/*
   minify jpg, png, svg images; 
  replace whitespace with underscore
  improve the extension (all lowercase)
   move them to dist folder
*/
  return src(tpath.src.images, {nocase:true,since:lastRun(minify)}).pipe( imagemin([
          //imagemin.gifsicle({interlaced: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({ plugins: [ {removeViewBox: true}, {cleanupIDs: false} ] }),
          imagemin.mozjpeg({quality: 75, progressive: true})
    ])).pipe(rename(function (path) {
          path.basename, path.extname = cleanFilename(path.basename, path.extname)
          })).pipe(dest(tpath.dest.images))
}

//function es6(){
//  // eslint() attaches the lint output to the "eslint" property
//  // of the file object so it can be used by other modules.
//  return  src(tpath.src.js)
//    .pipe(eslint({
//rules: {
//'no-alert': 0,
//'no-bitwise': 0,
//'camelcase': 1,
//'curly': 1,
//'eqeqeq': 0,
//'no-eq-null': 0,
//'guard-for-in': 1,
//'no-empty': 1,
//'no-use-before-define': 0,
//'no-obj-calls': 2,
//'no-unused-vars': 0,
//'new-cap': 1,
//'no-shadow': 0,
//'strict': 2,
//'no-invalid-regexp': 2,
//'comma-dangle': 2,
//'no-undef': 1,
//'no-new': 1,
//'no-extra-semi': 1,
//'no-debugger': 2,
//'no-caller': 1,
//'semi': 1,
//'quotes': 0,
//'no-unreachable': 2
//       },
//
//globals: ['$'],
//
//         envs: ['node']
//    }))
//  // eslint.format() outputs the lint results to the console.
//  // Alternatively use eslint.formatEach() (see Docs).
//  .pipe(eslint.format())
//    // To have the process exit with an error code (1) on
//    // lint error, return the stream and pipe to failAfterError last.
//    .pipe(eslint.failAfterError())
//    .pipe(dest(tpath.src.js))
//
//}

function copy(){ 
  //just copy the js files from src over to dest
  return src(tpath.src.copyRest).pipe(dest('./dist')) 
}

function restart(cb){
  var stream = nodemon({ script: './src/index.js' })
    .on('restart', function () {
        console.log('restarted!')
        })
  .on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10)  // restart the server in 10 seconds
      })
  return stream
  cb()
}

function watcher () {
  // nodemon
  watch(['./src/**/*', '!node_modules'], restart) 
    watch(tpath.src.copyRest, copy)
    watch(tpath.src.scss, genCSS)
    watch(tpath.src.images, minify)  
}

//exports.es6 = es6
exports.minify = minify
exports.genCSS = genCSS
exports.copy = copy
exports.build = series(genCSS, minify, copy)
exports.default = watcher

