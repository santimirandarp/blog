# TwoTravellers Blog

## July 2th 2021

First draft of the website

The web will be simple: **home**, **about** and **pictures** pages.

The pictures page is a grid of preview images + a slug, and you can click each image.

The reviews will be comments written by Hosts.


## July 8th 

Site is now hosted on an Linux EC2 instance in AWS.

* Server: NodeJS/Express
* Template Engine: ejs
* Style Sass

Uses Gulp to compile scss, minify images, etc.

**Support**
We want to use latest CSS and ES6 [In JS these new tools are released by ECMA every year.] but some browsers (or node) don't support all of them. For the former, the *postcss* with autoprefixer (and cssnano to minify) are used; for the latter Gulp/Webpack/Babel.

## July 16th

Using ES6 and Import/Export, babel, linters and JS minifiers. 

A bash script crops gallery images so that the loading time is shorter. 

Fonts are now served locally

There is a more solid header so background images and fonts are preloaded.

A commenting system is almost finished

Documentation is generated automatically with JSDocs

The plan is to extend it to a proper blog.

## October 28th

Webpack is used to bundle and transpile javascript. There is a standard way to write sass and js such that is easy to understand and read. 

The blog posts are generated using a template engine which reduces the overhead if we want to modify headers, footer, etc.
