(function () {
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/' + 'events';
  function makeRequest (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else if (xhr.status === 500) {
        var errorMessage = 'Server Error! Status: ' + xhr.status;
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
    eventsArray.forEach(function (event) {
      var eventContainer = document.getElementById('container-div');
      var resultElement = document.createElement('h3');
      var pElement = document.createElement('p');

      resultElement.innerHTML = event.name;
      pElement.innerHTML = event.placeId;
      pElement.innerHTML = event.startTime;
      pElement.innerHTML = event.endTime;

      eventContainer.appendChild(resultElement);
      eventContainer.appendChild(pElement);
      eventsSection.appendChild(eventContainer);
    });
    listPage.appendChild(eventsSection);
  }

  makeRequest(url, renderEvents);
})();
