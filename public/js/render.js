var renderModule = function (error, eventsArray) {
  var listPage = document.getElementById('list-page-content');
  var eventsSection = document.getElementById('events-section');
  while (eventsSection.firstChild) {
    eventsSection.removeChild(eventsSection.firstChild);
  }
  if (eventsArray.length === 0) {
    var noEvents = document.createElement('h1');
    noEvents.innerHTML = 'NO UPCOMING EVENTS.';
    noEvents.className = 'noEvents';
    return eventsSection.appendChild(noEvents);
  }
  if (error) {
    eventsSection.innerHTML = error;
  }

  var filterEvents = eventsArray.filter(function (event) {
    return event.en;
  });

  filterEvents.forEach(function (event) {
    var eventContainerDiv = document.createElement('div');
    eventContainerDiv.className = 'container-div';
    var h3Element = document.createElement('h3');
    h3Element.className = 'eventName';
    var h4Element = document.createElement('h4');
    h4Element.className = 'time';
    var h5Element = document.createElement('h5');
    h5Element.className = 'where';
    var aElement = document.createElement('a');
    var id = event._id;
    aElement.href = '/events/' + id;
    aElement.className = 'event-link';

    h3Element.innerHTML = event.en.name;
    h5Element.innerHTML = (event.place ? 'At ' + event.place.en.name : '');
    h4Element.innerHTML = new Date(event.startTime).toDateString().split(' ', [3]).join(' ') +
 ' / ' + new Date(new Date(event.startTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) + ' - ' + new Date(new Date(event.endTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'});

    aElement.appendChild(h3Element);
    aElement.appendChild(h5Element);
    aElement.appendChild(h4Element);
    eventContainerDiv.appendChild(aElement);
    eventsSection.appendChild(eventContainerDiv);
  });
  listPage.appendChild(eventsSection);
};
