/* global URL type:true axios */
/* eslint no-global-assign: "error" */

if (document.getElementById('arLang')) {
  document.getElementById('arLang').addEventListener('click', () => {
    const { search } = new URL(window.location.href);
    if (search) {
      window.location.href = '/ar' + search;
    } else {
      window.location.href = '/ar';
    }
  });

  document.getElementById('enLang').addEventListener('click', () => {
    const { search } = new URL(window.location.href);
    if (search) {
      window.location.href = '/en' + search;
    } else {
      window.location.href = '/en';
    }
  });

  // event listener for category select in header
  document.getElementById('categoryButton').addEventListener('click', () => {
    document
      .getElementById('categorySelectContainer')
      .classList.toggle('hide-cal');
  });
}
