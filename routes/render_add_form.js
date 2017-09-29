const request = require('request');
const getPlaces = require('./middleware/get_places.js');

module.exports = (req, res) => {
  getPlaces((err, places) => {
    if (err) res.send(err);
    res.render('add_event', {
      eachPlaces: places,
      title: 'Add Event'
    });
  });
};
