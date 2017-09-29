const request = require('request');

module.exports = (id, cb) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events/' + id;

  request.get(url, (error, result) => {
    if (error) {
      cb(error);
    } else {
      cb(null, JSON.parse(result.body));
    }
  });
};
