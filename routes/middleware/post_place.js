const request = require('request');
require('dotenv').config();

module.exports = (req, res, next) => {
  var url = `${process.env.URI}/places`;
  const requestBody = {};

  if (req.body.place_name_en) {
    requestBody.en = {
      name: req.body.place_name_en
    };
  } else if (req.body.place_name_ar) {
    requestBody.ar = {
      name: req.body.place_name_ar
    };
  } else {
    return next();
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
      res.render('error', {
        errorMessage: 'Sorry something went wrong please try again'
      });
    } else {
      res.locals.id = body._id;
      return next();
    }
  });
};
