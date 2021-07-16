import {src,lastRun,dest,watch,series,parallel} from "gulp";

//workaround for __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import path from 'path';
import imagemin from "gulp-imagemin";
import rename from 'gulp-rename';
import livereload from 'gulp-livereload';

import jsdoc from 'gulp-jsdoc3';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

import gulpSass from 'gulp-sass';
import sassBin from 'sass';
const sass = gulpSass(sassBin);
import postcss from 'gulp-postcss';
import postcssScss from 'postcss-scss' 
import autoprefixer from 'autoprefixer';

const SPUB = 'src/public';
const DPUB = 'dist/public';
const notNode = '!src/node_modules/**/*'
const tpath = {
src:{ 
nAll: '!src/**/*',
nAllJS:'!src/**/*.js', //doc & lint 'em
serverJS:['src/**/*.js',notNode,"!"+SPUB], //doc & lint 'em
allJS:['src/**/*.js', notNode], //doc & lint 'em
hidden:'src/.*', 
      publicJS:[`${SPUB}/javascripts/utils/*.js`, `${SPUB}/javascripts/*.js`],
                                            font:`${SPUB}/font/*.{ttf,woff,woff2,eof}`, 
      images:`${SPUB}/images/**/*.{png,svg,jpeg,jpg}`, //src(...,{case:false})
      scss:`${SPUB}/stylesheets/**/*.scss`
    },
dest:{ 
images:`${DPUB}/images/`,
       css:`${DPUB}/stylesheets/`,
       publicJS:`${DPUB}/javascripts/`
     }}

const makeDocs = cb => src(tpath.src.allJS,{read: false}).pipe(jsdoc(cb))

  /**
    Generates prefixed, compressed single CSS file from the SCSS files. 
    It holds a sourcemap used by the browser to link the CSS code line to source SCSS line (sourcemap).
   */
  const genCSS = () => {
    return src(tpath.src.scss, {sourcemaps:true})
      .pipe(postcss([autoprefixer()],{syntax: postcssScss}))
      .pipe(sass.sync({outputStyle:'compressed'}).on('error', sass.logError))
      .pipe(dest(tpath.dest.css))
  }

/** Function used in @minify(). Replaces filename spaces with underscores, 
  ' and " are removed, extension is lowercase.
 */
const cleanFilename = (filename, extension)=>{
  //spaces w underscore; ' or " with nothing; lowercase extension
  return filename.replace('/\s+/g','_').replace('/[\'\"]/g',''), extension.toLowerCase()
} 

/**
  minify jpg, png, svg images; 
  replace whitespace with underscore
  improve the extension (all lowercase)
  move them to dist folder
 */
const minify = () => {
  return src(tpath.src.images, {nocase:true,since:lastRun(minify)})
    .pipe( imagemin([
          //imagemin.gifsicle({interlaced: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({ plugins: [ {removeViewBox: true}, {cleanupIDs: false} ] }),
          imagemin.mozjpeg({quality: 75, progressive: true})
    ]))
    .pipe(rename(function (path) {
          path.basename, path.extname = cleanFilename(path.basename, path.extname)
          }))
  .pipe(dest(tpath.dest.images))
}

/** Lint uses gulp-eslint & lint to inspect all js code on the project src.
  All the project uses ES6 javascript
 */
const lint = () => {
  return src(tpath.src.allJS, {since:lastRun(lint)})
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError());
}

const lintFix = () => {
  return src(tpath.src.allJS, {since:lastRun(lintFix)})
    .pipe(eslint({fix:true}))
    .pipe(eslint.format())
    .pipe(dest(file=>file.base))
    //.pipe(eslint.failAfterError());
}

const copyJS = () => {
return src(tpath.src.serverJS, {since:lastRun(copy)})
.pipe(dest('./dist')) 
}

const copyHidden = () => {
return src( tpath.src.hidden, {since:lastRun(copy)})
.pipe(dest('./dist')) 
}

const copyFonts = () => {
return src( tpath.src.font,{since:lastRun(copy)})
.pipe(dest('./dist')) 
}

const copy = (cb) => {
copyFonts();
console.log("Executing copyHidden");
copyHidden();
copyFonts()
cb()
}


/** Concatenate all public (browser) JS, 
  compile using babel,
  uglify (minify),
  and write the source map to easily spot errors in the browser console */
const concatJS = ()=> src(tpath.src.publicJS, {since:lastRun(concatJS), sourcemaps:true})
  .pipe(concat('index.js'))
  .pipe(babel())
  .pipe(uglify())
  .pipe(dest(tpath.dest.publicJS));

  /** Watch this set of directories and run functions on change */
  function watcher () {
    livereload.listen()
      watch(tpath.src.lintPaths, lint)
      watch(tpath.src.copyRest, copy)
      watch(tpath.src.publicJS, concatJS)
      watch(tpath.src.scss, genCSS)
      watch(tpath.src.images, minify)  
  }

  const buildAndMinify = parallel(genCSS, series(lintFix,makeDocs,concatJS), minify, copy)
const build = parallel(genCSS, series(lintFix,makeDocs,concatJS), copy)

  /*export each task so they can be run from command line using gulp <taskName>*/
  export {minify,genCSS,copy,makeDocs,concatJS,build,lintFix}
  export default watcher
