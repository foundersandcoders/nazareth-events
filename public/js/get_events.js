/* global XMLHttpRequest */
var module = (function () {
  console.log(module);
  return {
    getEvents: function (path, callback) {
      var baseUrl = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
      var url = baseUrl + path;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('date from', xhr.responseText);
          callback(null, JSON.parse(xhr.responseText));
        } else if (xhr.status === 500) {
          var errorMessage = new Error('Server Error! Status: ' + xhr.status);
          callback(errorMessage, null);
        }
      };
      xhr.open('GET', url, true);
      xhr.send();
    }
  };
})();
