const axios = require('axios');

module.exports = async (req, res) => {
  let url = `${process.env.URI}/events`;
  try {
    if (req.query.date_from) {
      url =
        url + `?date_from=${req.query.date_from}&date_to=${req.query.date_to}`;
    } else {
      const currentDate = new Date().toISOString().slice(0, 10);
      url = url + `?date_from=${currentDate}`;
    }
    const eventsResponse = await axios.get(url);

    let events = eventsResponse.data.filter(event => event['en']);

    if (req.params.lang) {
      events = eventsResponse.data.filter(event => event[req.params.lang]);
    }

    if (req.query.category) {
      events = events.filter(event =>
        event.categories.includes(req.query.category)
      );
    }

    res.render('home', {
      title: 'events',
      events,
      lang: req.params.lang || 'en',
      calendarButton: true,
      filterButtons: true,
      english: req.params.lang !== 'ar',
      currentDate: new Date().toISOString().split('T')[0],
      arabic: req.params.lang === 'ar',
      numberOfEvents: events.length
    });
  } catch (err) {
    /* istanbul ignore next */
    res.render('error', {
      errorMessage: 'An error occurred, click on the title to go back home'
    });
  }
};
