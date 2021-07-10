import {src,lastRun,dest,watch,series,parallel} from "gulp";

//workaround for __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import path from 'path';
import imagemin from "gulp-imagemin";
import rename from 'gulp-rename';
//import nodemon from 'gulp-nodemon';
import livereload from 'gulp-livereload';
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
src:{ 
serverFiles:['./src/*.js','./src/local_modules/*.js'],
      public:'/src/public/',
      js:'src/**/*.js', 
      copyRest:['src/**/*', 'src/**/.*', '!src/node_modules/**/*', '!src/public/**/*'], 
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
//  return  src(tpath.src.js)
//    .pipe(eslint())
//  .pipe(eslint.format())
//    .pipe(eslint.failAfterError())
//    .pipe(dest(tpath.src.js))
//
//}

const copy = () => src(tpath.src.copyRest).pipe(dest('./dist')) 


function watcher () {
  //watch(tpath.src.serverFiles, restart) 
    watch(tpath.src.copyRest, copy)
    watch(tpath.src.scss, genCSS)
    watch(tpath.src.images, minify)  
    watch('dist/public/**/*', livereload)  
}

//exports.es6 = es6
const build = series(genCSS, minify, copy)
export {minify, genCSS, copy, build}
export default series(/*restart,*/ watcher)
