/* global  URL Cal formatDate */
import formatDate from './helpers/date';

if (document.getElementById('calendarIcon')) {
  function dateClickHandler(e) {
    var date = e.target.dataset.date;
    window.location.href =
      new URL(window.location.href).pathname +
      '?date_from=' +
      date +
      '&date_to=' +
      formatDate(date);

    document.getElementById('list-page-content').classList.toggle('hide');
    document.getElementById('show-cal').classList.toggle('hide-cal');
  }

  // event listener for calendar button in header
  document.getElementById('calendarIcon').addEventListener('click', () => {
    document.getElementById('list-page-content').classList.toggle('hide');
    document.getElementById('show-cal').classList.toggle('hide-cal');
  });
}
export default function addDateEventListeners() {
  document.querySelectorAll('td.day').forEach(day => {
    day.removeEventListener('click', dateClickHandler);
    day.addEventListener('click', dateClickHandler);
  });
}
