const request = require('request');
module.exports = (cb) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/places';

  const options = {
    method: 'GET',
    json: true,
    url
  };
  var places = [];
  request(options, (error, result, body) => {
    if (error) {
      cb(error);
    }
    places = result.body.map(place => {
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
    cb(null, places);
  });
};
