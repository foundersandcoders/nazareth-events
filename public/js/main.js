/* global  XMLHttpRequest */

(function () {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
  function makeRequest (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else if (xhr.status === 500) {
        var errorMessage = new Error('Server Error! Status: ' + xhr.status);
        callback(errorMessage, null);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  function renderEvents (error, eventsArray) {
    var listPage = document.getElementById('list-page-content');
    var eventsSection = document.getElementById('events-section');

    if (error) {
      eventsSection.innerHTML = error;
    }

    var filterEvents = eventsArray.filter(function (event) {
      if (event.en) {
        return true;
      }
      return false;
    });

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

      h3Element.innerHTML = event.en.name;
      h4Element.innerHTML = new Date(event.startTime).toDateString() + ' - ' + new Date(event.endTime).toDateString() + '<br>' + event.placeId.en.address;

      aElement.appendChild(h3Element);
      aElement.appendChild(h4Element);
      eventContainerDiv.appendChild(aElement);
      eventsSection.appendChild(eventContainerDiv);
    });
    listPage.appendChild(eventsSection);
  }

  makeRequest(url, renderEvents);
})();
