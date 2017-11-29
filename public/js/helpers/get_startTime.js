/* global axios Cal addDateEventListeners webpack */
import axios from 'axios';
import Cal from '../calendar';
import addDateEventListeners from '../main';

if (document.getElementById('calendarIcon')) {
  axios.get(`${webpack.env.URI}/events`).then(res => {
    const data = res.data.map(event => event.startTime);
    // create calendar
    const calendar = new Cal('calendar');
    calendar.render(data);
    addDateEventListeners();

    // calendar next and prev month buttons
    document.getElementById('next-button').onclick = () => {
      calendar.nextMonth(data);
      addDateEventListeners();
    };
    document.getElementById('prev-button').onclick = () => {
      calendar.previousMonth(data);
      addDateEventListeners();
    };
  });
}
