/* global axios Cal addDateEventListeners webpack */
import axios from 'axios';
import Cal from '../calendar';
import addDateEventListeners from '../main';

if (document.getElementById('calendarIcon')) {
  (function() {
    axios.get(`${webpack.env.URI}/events`).then(function(res) {
      var data = res.data.map(event => {
        return event.startTime;
      });
      // create calendar
      var calendar = new Cal('calendar');
      calendar.render(data);
      addDateEventListeners();

      // calendar next and prev month buttons
      document.getElementById('next-button').onclick = function() {
        calendar.nextMonth(data);
        addDateEventListeners();
      };
      document.getElementById('prev-button').onclick = function() {
        calendar.previousMonth(data);
        addDateEventListeners();
      };
    });
  })();
}
