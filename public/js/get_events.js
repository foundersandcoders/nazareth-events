/* global XMLHttpRequest */
var module = (function () {
  console.log(module);
  return {
    getEvents: function (queryParams, callback) {
      var baseUrl = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
      var url = '';
      if (!queryParams.date_from) {
        url = baseUrl;
      } else {
        url = baseUrl + '/?date_from=' + queryParams.date_from + '&date_to=' + queryParams.date_to;
      }
      console.log(url);
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
    }
  };
})();
