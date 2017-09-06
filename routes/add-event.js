const request = require('request');
module.exports = (req, res) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';

  console.log('form:', req.body);

  const requestBody = {
    categories: req.body.categories,
    accessibilityOptions: req.body.accessibilityOptions,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    cost: req.body.cost,
    image: req.body.imageUrl,
    en: {
      name: req.body.name,
      description: req.body.description
    }
  };
  console.log(requestBody);

  const options = {
    method: 'post',
    body: requestBody,
    json: true,
    url
  };

  request(options, (error, result, body) => {
    if (error) {
      res.send('error :(');
    } else {
      res.send('you added event successfully');
    }
  });
};
