const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true
});

const config = {
  devtool: 'source-map',
  entry: [
    path.resolve('./src/js/app.js'),
    path.resolve('./src/scss/app.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]!extract-loader!html-loader']
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
  devServer: {
    port: 8080,
    contentBase: path.resolve('dist'),
    index: '/dist/index.html'
  },
  resolve: {
    extensions: ['.js', '.scss', '.html', '.css'],
    modules: ['node_modules']
  },
  watch: true
}

module.exports = config;