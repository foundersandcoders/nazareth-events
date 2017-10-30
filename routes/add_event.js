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

  if (req.body.nameEn) {
    requestBody.en = {
      name: req.body.nameEn,
      description: req.body.descriptionEn ? req.body.descriptionEn : ''
    };
  }

  if (req.body.nameAr) {
    requestBody.ar = {
      name: req.body.nameAr,
      description: req.body.descriptionAr ? req.body.descriptionAr : ''
    };
  }

  const options = {
    method: 'post',
    body: requestBody,
    json: true,
    url
  };

  console.log(req.body);
  // request(options, (error, result, body) => {
  //   if (error) {
  //     res.send(error);
  //   } else {
  //     res.redirect(`/events/${body._id}`);
  //   }
  // });
};
