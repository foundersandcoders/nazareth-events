/* global axios Cal addDateEventListeners webpack */
import axios from 'axios';
import addDateEventListeners, { initCalendarEventListener } from '../main';
import { updateEvents } from '../template';
import { initEventListeners } from '../filter_listeners';

if (document.getElementById('calendarIcon')) {
  axios.get(`${webpack.env.URI}/events`).then(res => {
    // update the state with the events
    updateEvents(res.data);
    // initiate the event listeners
    initEventListeners();
    // create calendar
    initCalendarEventListener(res.data);
  });
}
