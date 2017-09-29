const request = require('request');

module.exports = (req, res, next) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/places';

  const options = {
    method: 'GET',
    json: true,
    url
  };

  request(options, (error, result, body) => {
    if (error) {
      res.send(error);
    }
    res.locals.places = result.body.map(place => {
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
    return next();
  });
};
