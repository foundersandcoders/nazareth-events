/* global getEventsModule type:true */
/* eslint no-global-assign: "error" */

var renderModule = function (error, apiData) {
  var listPage = document.getElementById('list-page-content');
  var eventsSection = document.getElementById('events-section');
  while (eventsSection.firstChild) {
    eventsSection.removeChild(eventsSection.firstChild);
  }

  renderEvents(apiData, 'en');

  document.getElementById('arLang').addEventListener('click', function () {
    renderEvents(apiData, 'ar');
  });
  document.getElementById('enLang').addEventListener('click', function () {
    renderEvents(apiData, 'en');
  });

  function renderEvents (eventsArray, language) {
    if (eventsArray.length === 0) {
      var noEvents = document.createElement('h1');
      noEvents.innerHTML = 'NO UPCOMING EVENTS.';
      noEvents.className = 'noEvents';
      return eventsSection.appendChild(noEvents);
    }
    if (error) {
      eventsSection.innerHTML = error;
    }

    var filterEvents = [];

    switch (language) {
      case 'ar':
        filterEvents = eventsArray.filter(function (event) {
          return event.ar;
        });
        break;
      default:
        filterEvents = eventsArray.filter(function (event) {
          return event.en;
        });
    }

    filterEvents.forEach(function (event) {
      var eventContainerDiv = document.createElement('div');
      eventContainerDiv.className = 'container-div';
      var h3Element = document.createElement('h3');
      h3Element.className = 'event text-primary';
      var h4Element = document.createElement('h4');
      h4Element.className = 'placeTime text-muted';
      var aElement = document.createElement('a');
      var id = event._id;
      aElement.href = '/events/' + id;
      aElement.className = 'event-link';

      h3Element.innerHTML = language === 'ar' ? event.ar.name : event.en.name;
      h4Element.innerHTML = new Date(event.startTime).toDateString() + '</br>' + new Date(new Date(event.startTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) + ' - ' + new Date(new Date(event.endTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) + '<br>' + (event.place ? 'At ' + event.place.en.name : '');

      aElement.appendChild(h3Element);
      aElement.appendChild(h4Element);
      eventContainerDiv.appendChild(aElement);
      eventsSection.appendChild(eventContainerDiv);
    });
    listPage.appendChild(eventsSection);
  };
};
