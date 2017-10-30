const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true
});

const browserSync = new BrowserSyncPlugin({
  host: 'localhost',
  port: 8080,
  proxy: 'http://localhost:8080'
});

const config = {
  devtool: 'source-map',
  entry: [
    path.resolve('./src/js/app.js'),
    path.resolve('./src/scss/app.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('./src/js'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract(
          ['css-loader', 'postcss-loader', 'sass-loader']
        )
      }
    ]
  },
  plugins: [
    extractSass,
    browserSync
  ],
  devServer: {
    port: 8080,
    contentBase: path.resolve('docs'),
    index: 'index.html'
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: ['node_modules']
  }
}

module.exports = config;