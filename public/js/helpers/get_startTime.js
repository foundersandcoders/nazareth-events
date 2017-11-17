/* global axios */

var dateArray = function (callback) {
  axios
    .get('https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events')
    .then(function (res) {
      callback(
        null,
        res.data.reduce((acc, event) => {
          return acc.concat(event.startTime);
        }, [])
      );
    })
    .catch(function (err) {
      console.log(err);
      callback(err, null);
    });
};
