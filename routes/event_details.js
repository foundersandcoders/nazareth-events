const request = require('request');

module.exports = (req, res) => {
  const url = `https://nazareth-open-tourism-platform.herokuapp.com/events/${req.params.id}`;

  request.get(url, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.render('event_details', {
        title: 'Event Details',
        eventText: JSON.parse(result.body)[req.params.lang],
        event: JSON.parse(result.body),
        place: JSON.parse(result.body).place[req.params.lang],
        back: req.headers.referer
      });
    }
  });
};
