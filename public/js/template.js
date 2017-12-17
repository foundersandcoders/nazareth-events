import homeView from '../../views/home.hbs';
import { initEventListeners } from './filter_listeners';
import { initCalendarEventListener } from './main.js';
import parse from 'webpack-parse-query';

let eventsState = [];

export function renderStuff(newFilter) {
  let filteredEvents = eventsState.filter(event => event[newFilter.lang]);

  if (newFilter.date_from) {
    const newDateTo = new Date();
    const newDateFrom = new Date(newFilter.date_from);
    filteredEvents = filteredEvents.filter(
      event =>
        new Date(event.startTime) >= newDateFrom &&
        new Date(event.startTime) <=
          new Date().setFullYear(newDateTo.getFullYear() + 1)
    );
  } else if (newFilter.categories && !newFilter.date_from) {
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > new Date()
    );
  } else {
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > new Date()
    );
  }

  if (newFilter.categories) {
    filteredEvents = filteredEvents.filter(event =>
      event.categories.includes(newFilter.categories)
    );
  }

  // when we use the template, we need the result bar date to be the same
  const { search, pathname } = new URL(window.location.href);
  const { date_from } = parse(search);
  const pathLang = pathname.split('/')[1];

  const template = homeView({
    events: filteredEvents,
    lang: pathLang,
    calendarButton: true,
    filterButtons: true,
    english: pathLang === '/en',
    arabic: pathLang === 'ar',
    currentDate: date_from || new Date().toISOString().split('T')[0]
  });
  document.getElementById('root').innerHTML = template;
  initCalendarEventListener(eventsState);
  initEventListeners();
}

export function updateEvents(data) {
  eventsState = data;
}
