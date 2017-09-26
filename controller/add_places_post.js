const request = require('request');
module.exports = (req, res, next) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/places';
  const requestBody = {
    location: [],
    categories: req.body.place_categories,
    accessibilityOptions: req.body.place_accessibilityOptions,
    imageUrl: req.body.place_imageUrl,
    website: req.body.place_website,
    phone: req.body.place_phone,
    email: req.body.place_email,
    en: {
      name: req.body.place_name,
      address: req.body.place_address,
      description: req.body.description,
      openingHours: req.body.place_openingHours
    }
  };

  const options = {
    method: 'post',
    body: requestBody,
    json: true,
    url
  };

  request(options, (error, result, body) => {
    if (error) {
      res.send(error);
    }
    return 1;
  });
  next();
};
