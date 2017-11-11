const request = require('request');

module.exports = (req, res) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events';

  const requestBody = {
    place: res.locals.id || req.body.placeId,
    categories: req.body.categories,
    accessibilityOptions: req.body.accessibilityOptions,
    startTime: req.body.startDate + 'T' + req.body.startTime,
    endTime: req.body.startDate + 'T' + req.body.endTime,
    cost: req.body.cost,
    imageUrl: req.body.imageUrl
  };

  if (req.body.name_english) {
    requestBody.en = {
      name: req.body.name_english,
      description: req.body.description_en ? req.body.description_en : ''
    };
  }

  if (req.body.name_arabic) {
    requestBody.ar = {
      name: req.body.name_arabic,
      description: req.body.description_ar ? req.body.description_ar : ''
    };
  }

  const options = {
    method: 'post',
    body: requestBody,
    json: true,
    url
  };

  request(options, (error, result, body) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect(`/events/${body._id}`);
    }
  });
};
