const request = require('request');
module.exports = (req, res) => {
  var id = req.params.id;
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events/' + id;

  request.get(url, (error, result) => {
    var event = JSON.parse(result.body);

    if (error) {
      res.send('error :(');
    } else {
      res.render('event_details', {
        title: 'event details',
        event: event,
        back: req.headers.referer
      });
    }
  });
};
