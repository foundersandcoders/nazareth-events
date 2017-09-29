const request = require('request');
const postEvent = require('./middleware/post_event.js');

module.exports = (req, res) => {
  const requestBody = {
    place: res.locals.id,
    categories: req.body.categories,
    accessibilityOptions: req.body.accessibilityOptions,
    startTime: req.body.startDate + 'T' + req.body.startTime,
    endTime: req.body.endDate + 'T' + req.body.endTime,
    cost: req.body.cost,
    imageUrl: req.body.imageUrl,
    en: {
      name: req.body.name,
      description: req.body.description
    }
  };

  postEvent(requestBody, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};
