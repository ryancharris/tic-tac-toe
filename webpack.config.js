const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true
});

const config = {
  devServer: {
    contentBase: path.resolve('build'),
    port: 8080
  },
  entry: [
    path.resolve('./src/js/app.js'),
    path.resolve('./src/scss/app.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['file-loader?name=/build/index.html!extract-loader!html-loader']
      },
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
        use: extractSass.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    extractSass
  ],
  resolve: {
    extensions: ['.js', '.scss', '.html'],
    modules: ['node_modules']
  },
  watch: true
}

module.exports = config;