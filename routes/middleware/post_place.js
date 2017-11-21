const axios = require('axios');
require('dotenv').config();

module.exports = async ({ body }, res, next) => {
  const { place_name_en, place_name_ar } = body;
  const requestBody = {};

  if (place_name_en) {
    requestBody.en = {
      name: place_name_en
    };
  } else if (place_name_ar) {
    requestBody.ar = {
      name: place_name_ar
    };
  } else {
    return next();
  }

  try {
    const addPlaceRes = await axios.post(
      `${process.env.URI}/places`,
      requestBody
    );
    res.locals.id = addPlaceRes.data._id;
    return next();
  } catch (err) {
    /* istanbul ignore next */
    res.render('error', {
      errorMessage: 'Could not save your location, please try again'
    });
  }
};
