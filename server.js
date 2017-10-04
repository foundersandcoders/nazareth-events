const path = require('path');
const hbs = require('express-handlebars');
const express = require('express');
const compression = require('compression');
const router = require('./routes/index.js');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const server = express();

server.set('port', process.env.PORT || 8080);
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, './', 'views'));

server.use(express.static(path.join(__dirname, './', 'public')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());

server.use(router);

server.engine('hbs', hbs({
  defaultLayout: 'main',
  layoutDir: path.join(__dirname, './', 'views/layouts'),
  partialsDir: path.join(__dirname, './', 'views/partials'),
  extname: 'hbs',
  helpers: {
    prettyDate: (date) => dateFormat(date, 'dddd d  mmm  yyyy'),
    prettyTime: (time) => dateFormat(time, 'UTC:HH:MM')
  }
}));

module.exports = server;
