const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const url = `${process.env.PRODUCTION_API}/events/${req.params.id}`;
  function getCoords(address) {
    return new Promise(async (resolve, reject) => {
      try {
        const geocodeRes = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${
            address
          }&region=il&key=${process.env.GEOCODE_KEY}`
        );
        resolve(geocodeRes);
      } catch (err) {
        reject(err);
      }
    });
  }

  try {
    const specificEventResponse = await axios.get(url);
    const event = specificEventResponse.data;
    let lng;
    let lat;
    if (event.place.location) {
      lat = event.place.location[0];
      lng = event.place.location[1];
    } else if (event.place[req.params.lang].address.trim()) {
      let address = event.place[req.params.lang].address;
      const geocode = await getCoords(address);
      console.log('here', geocode);
      if (geocode.data.status === 'OK') {
        const { location } = geocode.data.results[0].geometry;
        lat = location.lat;
        lng = location.lng;
      } else {
        // Nazareth coords
        lat = 32.699635;
        lng = 35.303546;
      }
    } else if (event.place.en.address.trim()) {
      let address = event.place.en.address;
      const geocode = await getCoords(address);
      if (geocode.data.status === 'OK') {
        const { location } = geocode.data.results[0].geometry;
        lat = location.lat;
        lng = location.lng;
      } else {
        // Nazareth coords
        lat = 32.699635;
        lng = 35.303546;
      }
    } else {
      // Nazareth coords
      lat = 32.699635;
      lng = 35.303546;
    }

    res.render('event_details', {
      title: 'Event Details',
      eventText: event[req.params.lang],
      event,
      placeDetails: event.place[req.params.lang],
      placeContact: event.place,
      back: req.headers.referer,
      key: process.env.GOOGLE_MAPS_KEY,
      lng,
      lat,
      website: event.place.website,
      facebook: event.place.website
        ? event.place.website.includes('facebook')
        : ''
    });
  } catch (err) {
    console.log('error', err);
    res.render('error', {
      errorMessage: 'Sorry something went wrong please try again'
    });
  }
};
