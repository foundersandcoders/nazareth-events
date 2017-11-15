/* global XMLHttpRequest */
var getEventsModule = function (queryParams, callback) {
  var baseUrl = 'http://localhost:3000/api/v1/events';
  if (queryParams.date_from && queryParams.date_to) {
    baseUrl +=
      '/?date_from=' +
      queryParams.date_from +
      '&date_to=' +
      queryParams.date_to;
  } else if (queryParams.date_from && !queryParams.date_to) {
    baseUrl += '/?date_from=' + queryParams.date_from;
  } else {
    baseUrl += '/?date_to=' + queryParams.date_to;
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
  xhr.open('GET', baseUrl, true);
  xhr.send();
};
