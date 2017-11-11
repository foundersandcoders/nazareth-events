const request = require('request');

module.exports = (req, res, next) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/api/v1/places';

  const options = {
    method: 'GET',
    json: true,
    url
  };

  request(options, (error, result, body) => {
    if (error) {
      res.send(error);
    } else {
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
      }).sort((indexA, indexB) => {
        const firstName = indexA.name.toUpperCase();
        const secondName = indexB.name.toUpperCase();
        return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
      });
    }
    return next();
  });
};
