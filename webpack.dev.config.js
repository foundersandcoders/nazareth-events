const path = require('path');

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
  },
  watch: true
};
