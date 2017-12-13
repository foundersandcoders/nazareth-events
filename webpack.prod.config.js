const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

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
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          precompileOptions: {
            knownHelpersOnly: false
          },
          layoutDirs: path.join(__dirname, 'views/layouts'),
          partialDirs: path.join(__dirname, 'views/partials'),
          helperDirs: path.join(__dirname, 'views/helpers')
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
      'webpack.env': {
        URI: JSON.stringify(process.env.PRODUCTION_API)
      }
    })
  ]
};
