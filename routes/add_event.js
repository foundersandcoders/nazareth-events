const request = require('request');
require('dotenv').config();

module.exports = (req, res) => {
  const url = `${process.env.URI}/events`;

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
      description: req.body.description_en
    };
  }

  if (req.body.name_arabic) {
    requestBody.ar = {
      name: req.body.name_arabic,
      description: req.body.description_ar
    };
  }

  const options = {
    method: 'post',
    body: requestBody,
    json: true,
    url
  };

  request(options, (error, result, body) => {
    /* istanbul ignore next */
    if (error) {
      res.render('home', {
        title: 'Not found'
      });
    } else {
      res.redirect(`en/events/${body._id}`);
    }
  });
};
