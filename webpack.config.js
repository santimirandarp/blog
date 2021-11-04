const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
output:{ filename:"bundle.js"}, 
resolve: { modules: ["./src/public/javascripts", "./src/node_modules/"] },
mode:"development", 
target:"web",
module:{
rules:[{test: /\.js$/i, use:{ loader:"babel-loader", options: { presets: ['@babel/preset-env'] }}}]
},
  optimization: {
    minimize: true,
   minimizer: [new TerserPlugin()],
 }
}
