const request = require('request');
const getEvent = require('./middleware/get_event.js');

module.exports = (req, res) => {
  const id = req.params.id;
  getEvent(id, (err, event) => {
    if (err) {
      res.send(err);
    } else {
      res.render('event_details', {
        title: 'event details',
        event,
        back: req.headers.referer
      });
    }
  });
};
