/* global  XMLHttpRequest */
function getEvents (path, callback) {
  var baseUrl = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
  var url = baseUrl + path;
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
module.exports = getEvents;
