const request = require('request');

module.exports = (req, res) => {
    const baseURL = 'https://nazareth-open-tourism-platform.herokuapp.com' + '/events';
    request(baseURL, function(error, response, body) {
      const parseResult = JSON.parse(body);
      const results = parseResult.filter(result => {

      });
      console.log(results);
      res.render('home', {
        events:parseResult
      });
    });
};
