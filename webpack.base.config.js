const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { getPlugins } = require('tachyons-build-css');
require('dotenv').config();

const getPostCssPlugins = () =>
  getPlugins({
    minify: process.env.NODE_ENV === 'production',
    atImport: {
      path: [
        path.join('node_modules', 'tachyons', 'src'),
        path.join(__dirname, 'public', 'css'),
      ],
    },
  });

module.exports = {
  context: path.join(__dirname),
  entry: [
    './public/js/helpers/get_startTime.js',
    './public/js/filter_listeners',
  ],
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [['env', { targets: { browsers: 'last 2 versions' } }]],
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          precompileOptions: {
            knownHelpersOnly: false,
          },
          layoutDirs: path.join(__dirname, 'views/layouts'),
          partialDirs: path.join(__dirname, 'views/partials'),
          helperDirs: path.join(__dirname, 'views/helpers'),
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: getPostCssPlugins,
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'webpack.env': {
        URI: JSON.stringify(process.env.PRODUCTION_API),
      },
    }),
    new ExtractTextPlugin('style.css'),
  ],
};
