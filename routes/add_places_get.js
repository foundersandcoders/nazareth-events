const request = require('request');
module.exports = (req, res) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/places';

  const options = {
    method: 'GET',
    json: true,
    url
  };
  request(options, (error, result) => {
    if (error) {
      res.send('error');
    }
    var places = result.body.map(place => {
      if (place.en) {
        return {
          name: place.en.name,
          id: place._id
        };
      } else {
        return {
          name: place.ar.name,
          id: place._id
        };
      }
    });
    res.render('add-event', {
      eachPlaces: places
    });
  });
};
