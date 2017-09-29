const request = require('request');

module.exports = (req, res) => {
  res.render('add_event', {
    eachPlaces: res.locals.places,
    title: 'Add Event'
  });
};
