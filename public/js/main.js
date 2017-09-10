/* global renderModule Cal */
function dateClickHandler (e) {
  var plusDay = parseInt(e.target.dataset.date.split('-')[2]) + 1;
  var plusDate = e.target.dataset.date.split('-');
  plusDate.pop();
  plusDate.push(plusDay.toString());
  var path = '/?date_from=' + e.target.dataset.date + '&date_to=' + plusDate;
  module.getEvents(path, renderModule.renderEvents);
  document.getElementById('list-page-content').classList.toggle('hide');
  document.getElementById('show-cal').classList.toggle('show');
};

function addDateEventListeners () {
  document.querySelectorAll('td.day').forEach(function (day) {
    day.removeEventListener('click', dateClickHandler);
    day.addEventListener('click', dateClickHandler);
  });
}

// create calendar
var calendar = new Cal('calendar');
calendar.render();
addDateEventListeners();

// event listener for calendar button in header
document.getElementById('calendar-button').addEventListener('click', function () {
  document.getElementById('list-page-content').classList.toggle('hide');
  document.getElementById('show-cal').classList.toggle('show');
});

// calendar next and prev month buttons
document.getElementById('next-button').onclick = function () {
  calendar.nextMonth();
  addDateEventListeners();
};

document.getElementById('prev-button').onclick = function () {
  calendar.previousMonth();
  addDateEventListeners();
};

module.getEvents('', renderModule.renderEvents);
