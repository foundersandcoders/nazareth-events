(function() {

  function dateClickHandler (e) {
    window.location.assign('/?d=' + e.target.dataset.date)
  }

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
  document.getElementById('calendar-button').addEventListener('click', function (e) {
    document.getElementById('list-page-content').classList.toggle('cal');
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
})();
