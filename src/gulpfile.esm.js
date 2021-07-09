import path from 'path';
import {src,dest,watch,series,parallel} from "gulp";
import imagemin from "gulp-imagemin";
import rename from 'gulp-rename';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';

//css
import gulpSass from 'gulp-sass';
import sassBin from 'sass';
const sass = gulpSass(sassBin)
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';

function cleanFilename(filename, extension){
  //spaces with underscore and ' or " with nothing
  filename = filename.replace('/\s+/g','_').replace('/[\'\"]/g','')
    //lowercase the extension
    extension = extension.toLowerCase()
    return filename, extension
} 

//path
const tpath = {
src:{ public:'public/src/',
  js:'public/src/javascripts/**/*.js',
      images:'public/src/images/**/*.+(png|svg|jpeg|jpg)', //case insensitive on src()
      scss:'public/src/stylesheets/**/*.scss',
      routes:'routes/*.js',
                      views:'views/**/*.ejs',
    },
dest:{ js:'public/dist/javascripts/',
       //'public/dist/javascripts/',
       images:'public/dist/images/',
       scss:'public/dist/stylesheets/',
     }}

function genCSS() {
  return src(tpath.src.scss)
    .pipe(sourcemaps.init()) //line in css, maps to source (file & line).
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss({plugins:[autoprefixer(),cssnano()]}))
    .pipe(sourcemaps.write())
    // dest will be a single index.css file, and some from folders (blog, about, etc).
    .pipe(dest(tpath.dest.scss))
};

function minify(){
  // minify jpg, png, svg images; 
  //replace whitespace with underscore
  //improve the extension (all lowercase)
  // move them to dist folder

  return src(tpath.src.images, {since:gulpLastRun(minify), nocase:true})
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

function es6(){
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
return  src(tpath.src.js)
    .pipe(eslint({
			rules: {
				'no-alert': 0,
				'no-bitwise': 0,
				'camelcase': 1,
				'curly': 1,
				'eqeqeq': 0,
				'no-eq-null': 0,
				'guard-for-in': 1,
				'no-empty': 1,
				'no-use-before-define': 0,
				'no-obj-calls': 2,
				'no-unused-vars': 0,
				'new-cap': 1,
				'no-shadow': 0,
				'strict': 2,
				'no-invalid-regexp': 2,
				'comma-dangle': 2,
				'no-undef': 1,
				'no-new': 1,
				'no-extra-semi': 1,
				'no-debugger': 2,
				'no-caller': 1,
				'semi': 1,
				'quotes': 0,
				'no-unreachable': 2
			},

			globals: ['$'],

			envs: ['node']
		}))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
  .pipe(dest(tpath.src.js))

}
function js(){ 
  //just copy the js files from src over to dest
  return src(tpath.src.js)
    .pipe(dest(tpath.dest.js)) 
}

function watcher (cb) {
  // nodemon
  const stream = nodemon({
script: './index.js' , 
ext: 'js scss ejs',
ignore: [ 'public/dist/', 'node_modules/' ],
watch:    [tpath.src.public, tpath.src.routes, tpath.src.views],
tasks: function (changedFiles) {
var tasks = []
if (!changedFiles) return tasks;
changedFiles.forEach(function (file) {
    if (/png|jp[e]g|svg/i.test(path.extname(file))  && !~tasks.indexOf('minify')) tasks.push('minify')
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
return  cb()
}

exports.es6 = es6
exports.minify = minify
exports.genCSS = genCSS
  exports.js = js
exports.default = watcher

