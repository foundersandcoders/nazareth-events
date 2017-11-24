const axios = require('axios');
require('dotenv').config();

module.exports = async ({ body }, res, next) => {
  const {
    place_name_en,
    place_name_ar,
    placeAddressEn,
    placeAddressAr,
    placeWebsite,
    placeEmail,
    placePhone
  } = body;

  const requestBody = {
    website: placeWebsite,
    email: placeEmail,
    phone: placePhone
  };

  if (place_name_en) {
    console.log(placeAddressEn);
    requestBody.en = {
      name: place_name_en,
      address: placeAddressEn
    };
  } else if (place_name_ar) {
    requestBody.ar = {
      name: place_name_ar,
      address: placeAddressAr
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
