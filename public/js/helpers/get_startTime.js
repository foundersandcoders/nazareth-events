/* global axios Cal addDateEventListeners webpack */
import axios from 'axios';
import addDateEventListeners, { initCalendarEventListener } from '../main';
import {
  updateEvents,
  addCategory,
  removeCategory,
  state,
  addSearchTerm
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

    const searchBarFilter = document.getElementById('filterEvents');
    searchBarFilter.addEventListener('keyup', event =>
      addSearchTerm(event.target.value)
    );

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

const details = document.getElementById('eventDetailsSection');
const title = document.getElementById('eventDetailsStickyTitle');

const sticky = (elements, stickDistance) => e => {
  console.log('hi', window.scrollY);
  if (window.scrollY > stickDistance) {
    elements[0].classList.add('event-details__title--fixed');
  } else {
    elements[0].classList.remove('event-details__title--fixed');
  }
};

title &&
  details &&
  window.addEventListener('scroll', sticky([title, details], 18 * 16));
