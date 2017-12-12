import homeView from '../../views/home.hbs';
import { initEventListeners } from './filter_listeners';
import { initCalendarEventListener } from './main.js';

let eventsState = [];

export function renderStuff(newFilter) {
  let filteredEvents = eventsState.filter(event => event[newFilter.lang]);
  let newDateTo;
  let newDateFrom;
  if (newFilter.date_from) {
    newDateTo = new Date('2018-11-2');
    newDateFrom = new Date(newFilter.date_from);
    filteredEvents = filteredEvents.filter(
      event =>
        new Date(event.startTime) >= newDateFrom &&
        new Date(event.startTime) <= newDateTo
    );
  } else if (newFilter.categories && !newFilter.date_from) {
    newDateFrom = new Date();
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > newDateFrom
    );
  } else {
    newDateFrom = new Date();
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > newDateFrom
    );
  }

  if (newFilter.categories) {
    filteredEvents = filteredEvents.filter(event =>
      event.categories.includes(newFilter.categories)
    );
  }

  const template = homeView({
    events: filteredEvents,
    lang: newFilter.lang || 'en',
    calendarButton: true,
    filterButtons: true,
    english: newFilter.lang === 'en',
    arabic: newFilter.lang === 'ar'
  });
  document.getElementById('root').innerHTML = template;
  initCalendarEventListener(eventsState);
  initEventListeners();
}

export function updateEvents(data) {
  eventsState = data;
}
