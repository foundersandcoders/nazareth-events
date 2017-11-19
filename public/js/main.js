/* global renderModule getEventsModule Cal addDays */
function dateClickHandler (e) {
  var date = e.target.dataset.date;
  var dateParams = {
    date_from: date,
    date_to: addDays(date, 14)
  };
  getEventsModule(dateParams, renderModule);
  document.getElementById('list-page-content').classList.toggle('hide');
  document.getElementById('show-cal').classList.toggle('hide-cal');
}

function addDateEventListeners () {
  document.querySelectorAll('td.day').forEach(function (day) {
    day.removeEventListener('click', dateClickHandler);
    day.addEventListener('click', dateClickHandler);
  });
}

// event listener for calendar button in header
document.getElementById('calendarIcon').addEventListener('click', function () {
  document.getElementById('list-page-content').classList.toggle('hide');
  document.getElementById('show-cal').classList.toggle('hide-cal');
});

getEventsModule(
  {
    date_from: new Date().toISOString().slice(0, 10)
  },
  renderModule
);
