/* global URL type:true axios */
/* eslint no-global-assign: "error" */
if (document.getElementById('arLang')) {
  document.getElementById('arLang').addEventListener('click', function() {
    var search = new URL(window.location.href).search;
    if (search) {
      window.location.href = '/ar' + search;
    } else {
      window.location.href = '/ar';
    }
  });

  document.getElementById('enLang').addEventListener('click', function() {
    var search = new URL(window.location.href).search;
    if (search) {
      window.location.href = '/en' + search;
    } else {
      window.location.href = '/en';
    }
  });

  // event listener for category select in header
  document
    .getElementById('categoryButton')
    .addEventListener('click', function() {
      document
        .getElementById('categorySelectContainer')
        .classList.toggle('hide-cal');
    });
}
