# What is Webpack
Webpack is used to compile JavaScript modules. Use it as CLI or NodeJS script (js file, or webpack-stream for gulp).
Best thing is we can use import and require for the front end files, bundle into one, and plug the result in the html files.
In the bundling, loads of processing can be done, like traspiling with babel.

## How to Install and Run
`npm install [webpack] [webpack-cli] [webpack-streams] --save-dev`

## Import/Export
Webpack will resolve the import/export graph.
Note that webpack will not alter any code other than import and export statements. If you are using other ES2015 features, make sure to use a transpiler such as Babel via webpack's loader system.

## Loaders
Loaders are transformations that are applied to the source code of a module. Pre-process files as you import or “load” them. Thus, loaders are like “tasks” in other build tools.

Within `module.rules` array we specify several loaders within your webpack configuration. 

Loaders are evaluated/executed from right to left (or from bottom to top). 

```
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

"Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a require()/import statement, use the raw-loader to transform it before you add it to the bundle."

mode and target are also options from the main JSON that should be properly set ex `mode:"development"|"production", target:"web"|"node"`.

Loaders follow the standard module resolution. In most cases it will be loaded from the module path (think npm install, node_modules).

### Links

An important question is what happens when webpack compiles the JS, places it into a suitable location that is linked to the html, with all the rest of the links. Because now probably the directory structure has changed. For this, the css-loader replaces the background images witht he right link on css/sass, and the html loader does this for the html written images.
