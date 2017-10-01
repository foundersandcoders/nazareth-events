const request = require('request');

module.exports = (req, res) => {
  const url = `https://nazareth-open-tourism-platform.herokuapp.com/events/${req.params.id}`;

  request.get(url, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      var event = JSON.parse(result.body);
      res.render('event_details', {
        title: 'Event Details',
        event: JSON.parse(result.body),
        back: req.headers.referer
      });
    }
  });
};
