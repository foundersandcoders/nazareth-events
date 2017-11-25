/* global  URL Cal formatDate */
import formatDate from './helpers/date';
let addDateEventListeners;

if (document.getElementById('list-page-content')) {
  const dateClickHandler = e => {
    const { date } = e.target.dataset;
    window.location.href = `${
      new URL(window.location.href).pathname
    }?date_from=${date}&date_to=
      ${formatDate(date)}`;

    document.getElementById('list-page-content').classList.toggle('hide');
    document.getElementById('show-cal').classList.toggle('hide-cal');
  };

  // event listener for calendar button in header
  document.getElementById('calendarIcon').addEventListener('click', () => {
    document.getElementById('list-page-content').classList.toggle('hide');
    document.getElementById('show-cal').classList.toggle('hide-cal');
  });

  addDateEventListeners = () => {
    document.querySelectorAll('td.day').forEach(day => {
      day.removeEventListener('click', dateClickHandler);
      day.addEventListener('click', dateClickHandler);
    });
  };
}

export default addDateEventListeners;
