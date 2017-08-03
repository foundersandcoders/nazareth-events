var request = require('request');
var url = require('url');
module.exports = (req, res) => {
    request('https://nazareth-open-tourism-platform.herokuapp.com' + '/events', function(error, response, body) {
      var parseResult = JSON.parse(body);

      res.render('home', {
        events:parseResult
      });
    });
};
