const request = require('request');

module.exports = (req, res) => {
  const id = req.params.id;
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/events/' + id;

  request.get(url, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.render('event_details', {
        title: 'event details',
        event: JSON.parse(result.body),
        back: req.headers.referer
      });
    }
  });
};
