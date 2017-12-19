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
        /* istanbul ignore next */
        reject(err);
      }
    });
  }

  try {
    const specificEventResponse = await axios.get(url);
    const event = specificEventResponse.data;
    let lng;
    let lat;
    try {
      if (event.place.location) {
        lat = event.place.location[0];
        lng = event.place.location[1];
      } else if (event.place[req.params.lang].address) {
        let address = event.place[req.params.lang].address;
        const geocode = await getCoords(address);

        const { location } = geocode.data.results[0].geometry;
        lat = location.lat;
        lng = location.lng;
      } else if (event.place.en.address) {
        let address = event.place.en.address;
        const geocode = await getCoords(address);
        const { location } = geocode.data.results[0].geometry;
        lat = location.lat;
        lng = location.lng;
      } else {
        // Nazareth coords
        lat = 32.699635;
        lng = 35.303546;
      }
    } catch (err) {
      // Nazareth coords
      lat = 32.699635;
      lng = 35.303546;
    }

    const phoneMessage =
      req.params.lang === 'en'
        ? 'Phone number was not provided contact Nazareth cultural & tourism association to find out more: +972-4-6106611'
        : 'الرجاء الاتصال بجمعية الناصرة للثقافة والسياحة لمعرفة المزيد +972-4-6106611 ';

    res.render('event_details', {
      title: 'Event Details',
      eventText: event[req.params.lang],
      event,
      placeDetails: event.place[req.params.lang],
      placeContact: event.place,
      back: req.headers.referer,
      key: process.env.GOOGLE_MAPS_KEY,
      lng,
      phoneMessage,
      lat,
      website: event.place.website,
      facebook: event.place.website
        ? event.place.website.includes('facebook')
        : ''
    });
  } catch (err) {
    res.render('error', {
      errorMessage: 'Sorry something went wrong please try again'
    });
  }
};
