module.exports = (req, res) => {
  res.render('add_event', {
    places: res.locals.places,
    title: 'Add Event',
    back: req.headers.referer
  });
};
