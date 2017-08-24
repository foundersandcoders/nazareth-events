const request = require('request');
module.exports = (req, res) => {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';

  request.post(url, (error, result) => {
    // var addEvent = { name: req.body.name, img: req.body.imageUrl, startTime: req.body.startTime, endTime: req.body.endTime, place: req.body.place, categories: req.body.categories, cost: req.body.cost, disabledaccess: req.body.accessibilityOptions, description: req.body.description };
    // console.log(addEvent);
    var event = JSON.parse(result.body);
    console.log(event);

    if (error) {
      res.send('error :(');
    } else {
      res.render('add-event', {
        title: 'add event'
      });
    }
  });
};
