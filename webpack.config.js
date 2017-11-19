const path = require('path');

module.exports = {
  context: path.join(__dirname, 'public/js'),
  entry: [],
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['env', { targets: { browsers: 'last 2 versions' } }]]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
