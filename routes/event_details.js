var request = require('request');
module.exports = (req, res) => {
  var id = req.params.id;
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events/' + id;

  request.get(url, (error, event) => {
    if (error) {
      res.send('error :(');
    }
    var placeId = JSON.parse(event.body).placeId;
    var placeURL = 'https://nazareth-open-tourism-platform.herokuapp.com/places/' + placeId;
    request.get(placeURL, (error, place) => {
      var placeInfo = JSON.parse(place.body);
      if (error) {
        res.send('error :(');
      } else {
        res.render('event_details', {
          title: 'event details',
          placeInfo: placeInfo,
          back: req.headers.referer
        });
      }
    });
  });
};
