/* global axios Cal addDateEventListeners */

(function () {
  axios
    .get('https://nazareth-open-tourism-platform.herokuapp.com/api/v1/events')
    .then(function (res) {
      var data = res.data.reduce((acc, event) => {
        return acc.concat(event.startTime);
      }, []);
      // create calendar
      var calendar = new Cal('calendar');
      calendar.render(data);
      addDateEventListeners();

      // calendar next and prev month buttons
      document.getElementById('next-button').onclick = function () {
        calendar.nextMonth(data);
        addDateEventListeners();
      };
      document.getElementById('prev-button').onclick = function () {
        calendar.previousMonth(data);
        addDateEventListeners();
      };
    });
})();
