const axios = require('axios');
const sortPlaces = require('../../helpers/sort_places.js');

module.exports = async (req, res, next) => {
  try {
    const url = `${process.env.URI}/places`;
    const placesResponse = await axios.get(url);
    res.locals.places = sortPlaces(placesResponse.data);

    return next();
  } catch (err) {
    /* istanbul ignore next */
    return next();
  }
};
