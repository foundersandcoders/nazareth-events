const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const url = `${process.env.URI}/events/${req.params.id}`;
  try {
    const result = await axios.get(url);
    const event = result.data;
    res.render('event_details', {
      title: 'Event Details',
      eventText: event[req.params.lang],
      event,
      place: event.place[req.params.lang],
      back: req.headers.referer
    });
  } catch (err) {
    res.render('event_details', {
      title: 'Not Found'
    });
  }
};
