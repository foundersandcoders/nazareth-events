const request = require('request');

module.exports = (body, cb) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
  const options = {
    method: 'post',
    body,
    json: true,
    url
  };

  request(options, (err, result, body) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};
