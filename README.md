This is the top level folder, where the gulp manager is.

The readme for the *blog* is either in `/src` or `/dist/`.

Gulp executes a series of tasks that: 
1. Takes files from `/src` 
2. Process them in different ways 
3. and moves them to `/dist`. 

There are also docs generated with jsdocs on the `/out` folder.

Also, many of the front end tasks are handled by Webpack, integrated into gulp with webpack-streams.
