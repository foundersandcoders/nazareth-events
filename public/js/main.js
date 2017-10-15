/* global renderModule getEventsModule Cal addDays */
function dateClickHandler (e) {
  var date = e.target.dataset.date;
  var dateParams = {
    date_from: date,
    date_to: addDays(date, 14)
  };
  getEventsModule(dateParams, renderModule);
  document.getElementById('list-page-content').style.display = 'block';
  document.getElementById('show-cal').style.display = 'none';
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
document.getElementById('calendarIcon').addEventListener('click', function () {
  var list = document.getElementById('list-page-content');
  var calendar = document.getElementById('show-cal');
  if (list.style.display === 'block') {
    list.style.display = 'none';
    calendar.style.display = 'block';
  } else {
    calendar.style.display = 'none';
    list.style.display = 'block';
  }
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

getEventsModule({
  date_from: new Date().toISOString().slice(0, 10)
}, renderModule);
