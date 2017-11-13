const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10);
    const eventsResponse = await axios.get(
      `https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events/?date_from=${
        currentDate
      }`
    );

    let events = eventsResponse.data.filter(event => event['en']);
    if (req.params.lang) {
      events = eventsResponse.data.filter(event => event[req.params.lang]);
    }

    res.render('home', {
      title: 'events',
      events,
      lang: req.params.lang || 'en',
      calendarButton: true,
      filterButtons: true,
      english: req.params.lang !== 'ar',
      arabic: req.params.lang === 'ar'
    });
  } catch (err) {}
};
