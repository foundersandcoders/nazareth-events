const request = require('request');
const qs = require('querystring');
require('dotenv').config();

module.exports = (req, res) => {
  res.render('add_event', {
    places: res.locals.places,
    title: 'Add Event'
  });
};
