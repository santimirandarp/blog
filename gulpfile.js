//it was written with "import" but webpack configuration file has to be
// written in es5, so i roll back to require.
const {src,lastRun,dest,watch,series,parallel} = require("gulp");
//console.log(process.cwd()); directory paths are resolved to.

const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");

const jsdoc = require("gulp-jsdoc3");
const eslint = require("gulp-eslint");
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const postcssScss = require("postcss-scss");
const autoprefixer = require("autoprefixer");


const SPUB = "src/public";
const DPUB = "dist/public";
const notNode = "!src/node_modules/**/*";
const tpath = {
src:{ nAll: "!src/**/*",
      nAllJS:"!src/**/*.js", 
      serverJS:["src/**/*.js",notNode,"!"+SPUB+"/**/*"], 
      entries:SPUB+"/javascripts/**/entry.js",
      allJS:["src/**/*.js", notNode], 
      views:"src/views/**/*.html", 
      topLevelNotJS:["!src/*.js", "src/.*", "src/*"], 
      publicJS:SPUB+"/javascripts/**/*.js",
      scss:SPUB+"/stylesheets/**/*.scss",
      font:SPUB+"/font/*.{ttf,woff,woff2,eof}", 
      images:SPUB+"/images/**/*.{png,svg,jpeg,jpg}"
    },
dest:{ images:DPUB+"/images/",
       css:DPUB+"/stylesheets/",
       publicJS:DPUB+"/javascripts/",
       bundles:DPUB+"/javascripts/**/bundle.js",
     }
}

const makeDocs = () => src(tpath.src.allJS,{read: false}).pipe(jsdoc());

/**
  Generates prefixed, compressed single CSS file from the SCSS files. 
  Includes a sourcemap used by the browser to link the CSS code line to source SCSS line (sourcemap).
 */
const genCSS = () => src(tpath.src.scss, {sourcemaps:true})
.pipe(postcss([autoprefixer()],{syntax: postcssScss}))
.pipe(sass.sync({outputStyle:"compressed"}).on("error", sass.logError))
.pipe(dest(tpath.dest.css))

  /** Function used in @minify(). Replaces filename spaces with underscores, 
    " and " are removed, extension is lowercase.
   */
  const cleanFilename = (filename, extension)=> (filename.replace("/\s+/g","_")
      .replace("/[\"\"]/g",""), extension.toLowerCase())

  /**
    minify jpg, png, svg images; 
    replace whitespace with underscore
    improve the extension (all lowercase)
    move them to dist folder
   */
  const minify = () => {
    return src(tpath.src.images, {nocase:true,since:lastRun(minify)})
      .pipe( imagemin([
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
}

const lintFix = () => {
  return src(tpath.src.allJS, {since:lastRun(lintFix)})
    .pipe(eslint({fix:true}))
    .pipe(eslint.format())
    .pipe(dest(file=>file.base))
}

const copyViews = () => {
  return src(tpath.src.views, {since:lastRun(copy)})
    .pipe(dest("./dist/views")) 
}
const copyJS = () => {
  return src(tpath.src.serverJS, {since:lastRun(copy)})
    .pipe(dest("./dist")) 
}

const copyFonts = () => {
  return src( tpath.src.font,{since:lastRun(copy)})
    .pipe(dest(DPUB+"/font")) 
}

const copyHidden = () => {
  return src(tpath.src.topLevelNotJS, {since:lastRun(copy)})
    .pipe(dest("./dist")) 
}


const copy = (cb) => {
  copyViews();
  copyJS();
  copyFonts();
  copyHidden();
  cb()
}


/** Bundle transpile and minify JS.
  write source map to spot errors in browser console */
const bundle = dirname => src(`${SPUB}/javascripts/${dirname}/entry.js`,{sourcemaps:true, since:lastRun(bundle)})
.pipe(webpack(webpackConfig))
.pipe(dest(`${DPUB}/javascripts/${dirname}`))

  const bundleEach = listOfDirs => listOfDirs.forEach(dir=>bundle(dir));
  const frontEndBundle = () => bundleEach(["home","blog","about"])

  const frontEndJS = cb => { frontEndBundle(); cb() }

  /** Watch this set of directories and run functions on change */
  function watcher (cb) {
    watch(tpath.src.allJS, lint);
    watch(["src/**/*", ...tpath.src.topLevelNotJS, notNode, "!"+SPUB+"/**/*"], copy); 
    watch(tpath.src.publicJS, frontEndJS);
    watch(tpath.src.scss, genCSS);
    watch(tpath.src.images, minify);  
   cb()
  };

const buildAndMinify = parallel(genCSS, series(lintFix,makeDocs,frontEndJS), minify, copy);
const build = parallel(genCSS, series(lintFix,makeDocs,frontEndJS), copy);

/*export each task so they can be run from command line using gulp <taskName>*/
module.exports =  {buildAndMinify,minify,genCSS,copy,makeDocs,frontEndJS,build,lint,lintFix, watcher};
exports.default =  watcher;
