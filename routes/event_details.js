const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const OTPUrl = `https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events/${
    req.params.id
  }`;

  try {
    const specificEventResponse = await axios.get(OTPUrl);
    const event = specificEventResponse.data;
    let lng;
    let lat;
    if (event.place.location) {
      console.log(event.place.location);
      lat = event.place.location[0];
      lng = event.place.location[1];
    } else {
      let address = event.place[req.params.lang].address;
      const geocode = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          address
        }&region=il&key=${process.env.GEOCODE_KEY}`
      );
      const { location } = geocode.data.results[0].geometry;
      lng = location.lng;
      lat = location.lat;
    }

    res.render('event_details', {
      title: 'Event Details',
      eventText: event[req.params.lang],
      event,
      place: event.place[req.params.lang],
      back: req.headers.referer,
      key: process.env.GOOGLE_MAPS_KEY,
      lng,
      lat
    });
  } catch (err) {
    console.log('me', err);
  }
};
