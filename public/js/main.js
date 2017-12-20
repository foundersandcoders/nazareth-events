/* global  URL Cal formatDate */
import formatDate from './helpers/date';
import Cal from './calendar';

export function initCalendarEventListener(data) {
  const calendarData = data.map(event => event.startTime);

  const dateClickHandler = e => {
    const { date } = e.target.dataset;
    console.log(date);
    window.location.href = `${
      new URL(window.location.href).pathname
    }?date_from=${date}&date_to=${formatDate(date)}`;

    document.getElementById('show-cal').classList.toggle('calendar--hide');
  };

  // builds the calendar
  const calendar = new Cal('calendar');
  calendar.render(calendarData);

  // calendar next and prev month buttons
  document.getElementById('next-button').onclick = () => {
    calendar.nextMonth(calendarData);
    document.querySelectorAll('td.day').forEach(day => {
      day.removeEventListener('click', dateClickHandler);
      day.addEventListener('click', dateClickHandler);
    });
  };
  document.getElementById('prev-button').onclick = () => {
    calendar.previousMonth(calendarData);
    document.querySelectorAll('td.day').forEach(day => {
      day.removeEventListener('click', dateClickHandler);
      day.addEventListener('click', dateClickHandler);
    });
  };

  document.querySelectorAll('td.day').forEach(day => {
    day.removeEventListener('click', dateClickHandler);
    day.addEventListener('click', dateClickHandler);
  });
}
