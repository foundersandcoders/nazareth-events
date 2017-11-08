const request = require('request');

module.exports = (req, res, next) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/api/v1/places';
  const requestBody = {};

  if (req.body.place_name_en) {
    requestBody.en = {
      name: req.body.place_name_en
    };
  }

  if (req.body.place_name_ar) {
    requestBody.ar = {
      name: req.body.place_name_ar
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
      res.locals.id = body._id;
      return next();
    }
  });
};
