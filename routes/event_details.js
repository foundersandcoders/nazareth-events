const axios = require('axios');

module.exports = async (req, res) => {
  const url = `https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events/${
    req.params.id
  }`;
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
