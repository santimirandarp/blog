export default {
output:{ filename:`bundle.js`}, 
mode:"development", 
target:"web",
module:{
rules:[{use:"babel-loader", options: { presets: ['@babel/preset-env'] }}]
},
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}
