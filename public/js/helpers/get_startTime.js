/* global axios Cal addDateEventListeners webpack */
import axios from 'axios';
import addDateEventListeners, { initCalendarEventListener } from '../main';
import {
  updateEvents,
  addCategory,
  removeCategory,
  renderStuff,
  state
} from '../template';
import { initEventListeners } from '../filter_listeners';
import parse from 'webpack-parse-query';

if (document.getElementById('calendarIcon')) {
  const { search, pathname } = new URL(window.location.href);
  const { date_from } = parse(search);
  const pathLang = pathname.split('/')[1];
  state.lang = pathLang;
  state.date_from = date_from;

  axios.get(`${webpack.env.URI}/events`).then(res => {
    // update the state with the events
    updateEvents(res.data);
    // initiate the event listeners
    initEventListeners();
    // create calendar
    initCalendarEventListener(res.data);

    const categoryCheckboxEventListen = event => {
      const checked = event.target.checked;
      const category = event.target.value;
      if (checked) {
        addCategory(category);
      } else {
        removeCategory(category);
      }
    };
    const categoryCheckbox = document.getElementsByClassName(
      'category-checkbox'
    );
    for (let i = 0; i < categoryCheckbox.length; i++) {
      categoryCheckbox[i].addEventListener(
        'change',
        categoryCheckboxEventListen
      );
    }
  });
}
