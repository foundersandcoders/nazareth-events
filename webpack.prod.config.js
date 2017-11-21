const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname),
  entry: [
    './public/js/helpers/get_startTime.js',
    './public/js/filter_listeners'
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js'
  },
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        URI: JSON.stringify(
          'https://nazareth-open-tourism-platform.herokuapp.com/api/v1'
        )
      }
    })
  ]
};
