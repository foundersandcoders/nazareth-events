const axios = require('axios');

module.exports = async (req, res, next) => {
  const url =
    'https://nazareth-open-tourism-platform.herokuapp.com/api/v1/places';
  const placesResponse = await axios.get(url);
  res.locals.places = placesResponse.data
    .map(place => {
      if (place.ar) {
        return {
          name: place.ar.name,
          id: place._id
        };
      } else {
        return {
          name: place.en.name,
          id: place._id
        };
      }
    })
    .sort((indexA, indexB) => {
      const firstName = indexA.name.toUpperCase();
      const secondName = indexB.name.toUpperCase();
      return firstName < secondName ? -1 : 1;
    });

  return next();
};
