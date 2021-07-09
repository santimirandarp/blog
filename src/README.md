# TwoTravellers Blog

July 2th 2021

First draft of the website, structure and functionality.

The web will be simple: **home**, **about** and **pictures** pages.

The pictures page is a grid of preview images + a slug, and you can click each image.

The reviews will be comments written by Hosts.


July 8th 

Site is now hosted on an EC2 instance in Amazon Cloud (AWS).

* It's an Express server using ejs to render html. 
* Style is written in Sass (scss).

On development it uses Gulp to compile scss, minify images, and move files from **src** place to **dist**.

Now trying to switch to ES6 syntax, to use import/export both in server and browser JS, and run a linter.

`type:modules` enables ES6 for node js, but not for gulp, and so `gulpfile.js` can't be ES6.

Trying to use **esm** for this matter.
