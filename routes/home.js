const axios = require('axios');

module.exports = async (req, res) => {
  let url = `${process.env.PRODUCTION_API}/events`;
  try {
    if (req.query.date_from) {
      url =
        url + `?date_from=${req.query.date_from}&date_to=${req.query.date_to}`;
    } else {
      const currentDate = new Date().toISOString().slice(0, 10);
      url = url + `?date_from=${currentDate}`;
    }
    const eventsResponse = await axios.get(url);

    let events = eventsResponse.data.filter(
      event => event['en'] && event.verified
    );

    if (req.params.lang) {
      events = eventsResponse.data.filter(event => event[req.params.lang]);
    }

    const categories = Object.keys(
      events
        .reduce((acc, { categories }) => [...acc, ...categories], [])
        .reduce((acc, category) => {
          acc[category] = true;

          return acc;
        }, {})
    );

    res.render('home', {
      title: 'events',
      events,
      categories,
      lang: req.params.lang || 'en',
      calendarButton: true,
      filterButtons: true,
      english: req.params.lang !== 'ar',
      currentDate:
        req.query.date_from || new Date().toISOString().split('T')[0],
      arabic: req.params.lang === 'ar'
    });
  } catch (err) {
    /* istanbul ignore next */
    res.render('error', {
      errorMessage: 'An error occurred, click on the title to go back home'
    });
  }
};
