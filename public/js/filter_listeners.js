/* global URL type:true axios */
/* eslint no-global-assign: "error" */
import { renderStuff } from './template';
import parse from 'webpack-parse-query';
export function initEventListeners() {
  if (document.getElementById('arLang')) {
    document.getElementById('arLang').addEventListener('click', () => {
      const { search } = new URL(window.location.href);
      if (search) {
        const { date_to, date_from } = parse(search);
        const data = {
          date_to,
          date_from,
          category,
          lang: 'ar'
        };
        return renderStuff(data);
      } else {
        return renderStuff({ lang: 'ar' });
      }
    });
  }
  document.getElementById('enLang').addEventListener('click', () => {
    const { search } = new URL(window.location.href);
    if (search) {
      const { date_to, date_from } = parse(search);
      const data = {
        date_to,
        date_from,
        lang: 'en'
      };
      renderStuff(data);
    } else {
      renderStuff({ lang: 'en' });
    }
  });

  // event listener for category select in header

  document
    .getElementById('categoryButton')
    .addEventListener('click', function() {
      document
        .getElementById('categorySelectContainer')
        .classList.toggle('hide');
    });

  const categoriesDropdownList = document.getElementById('categorySelect');

  categoriesDropdownList.addEventListener('click', event => {
    const { value } = categoriesDropdownList.options[
      categoriesDropdownList.selectedIndex
    ];
    if (categoriesDropdownList.selectedIndex > 0) {
      const { pathname, search } = new URL(window.location.href);
      if (search) {
        const { date_to, date_from } = parse(search);
        data = {
          date_to,
          date_from,
          lang: pathname.split('/')[1],
          categories: value
        };
        renderStuff(data);
      } else {
        data = {
          lang: pathname.split('/')[1],
          categories: value
        };
        renderStuff(data);
      }
    }
  });
}
