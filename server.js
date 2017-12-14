const path = require('path');
const hbs = require('express-handlebars');
const express = require('express');
const compression = require('compression');
const router = require('./routes/index.js');
const dateFormat = require('dateformat');

const server = express();

server.set('port', process.env.PORT || 8080);
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, './', 'views'));

server.use(express.static(path.join(__dirname, './', 'public')));
server.use(compression());

server.use(router);

server.engine(
  'hbs',
  hbs({
    defaultLayout: 'main',
    layoutDir: path.join(__dirname, './', 'views/layouts'),
    partialsDir: path.join(__dirname, './', 'views/partials'),
    extname: 'hbs',
    helpers: {
      prettyDate: require('./views/helpers/prettyDate.js'),
      prettyTime: require('./views/helpers/prettyTime.js'),
      findNamelang: require('./views/helpers/findNamelang.js'),
      findPlaceLang: require('./views/helpers/findPlaceLang.js'),
      removeProtocol: require('./views/helpers/removeProtocol.js'),
      checkCategory: require('./views/helpers/checkCategory.js'),
      getLength: require('./views/helpers/getLength.js')
    }
  })
);

module.exports = server;
