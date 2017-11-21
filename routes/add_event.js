const axios = require('axios');
require('dotenv').config();

module.exports = async ({ body }, res) => {
  const url = `${process.env.URI}/events`;

  const requestBody = {
    place: res.locals.id || body.placeId,
    categories: body.categories,
    accessibilityOptions: body.accessibilityOptions || [],
    startTime: body.startDate + 'T' + body.startTime,
    endTime: body.startDate + 'T' + body.endTime,
    cost: body.cost,
    imageUrl: body.imageUrl
  };

  if (body.nameEn) {
    requestBody.en = {
      name: body.nameEn,
      description: body.descriptionEn
    };
  }

  if (body.nameAr) {
    requestBody.ar = {
      name: body.nameAr,
      description: body.descriptionAr
    };
  }

  try {
    const { data: { _id } } = await axios.post(url, requestBody);
    res.redirect(`en/events/${_id}`);
  } catch (err) {
    /* istanbul ignore next */
    res.render('error', {
      errorMessage:
        'Sorry something went wrong, go back to the form and try again'
    });
  }
};
