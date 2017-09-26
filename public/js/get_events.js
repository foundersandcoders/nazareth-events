/* global XMLHttpRequest */
var getEventsModule = function (queryParams, callback) {
  var baseUrl = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
  var url = '';
  if (!queryParams.date_from && !queryParams.date_to) {
    url = baseUrl;
  } else if (queryParams.date_from && queryParams.date_to) {
    url = baseUrl + '/?date_from=' + queryParams.date_from + '&date_to=' + queryParams.date_to;
  } else if (queryParams.date_from && !queryParams.date_to) {
    url = baseUrl + '/?date_from=' + queryParams.date_from;
  } else {
    url = baseUrl + '/?date_to=' + queryParams.date_to;
  }
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else if (xhr.status === 500 || xhr.status === 400) {
      var errorMessage = new Error('Server Error! Status: ' + xhr.status);
      callback(errorMessage, null);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};
