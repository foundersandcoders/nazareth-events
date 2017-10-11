const request = require('request');

module.exports = (req, res) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';

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
      name: req.body.name_english
    };
  }

  if (req.body.name_arabic) {
    requestBody.ar = {
      name: req.body.name_arabic
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
