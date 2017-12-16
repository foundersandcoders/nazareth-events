/* global URL type:true axios */
/* eslint no-global-assign: "error" */
import { renderStuff } from './template';
import parse from 'webpack-parse-query';
export function initEventListeners() {
  const langSelect = lang => event => {
    event.preventDefault();
    const { search } = new URL(window.location.href);
    if (search) {
      const { date_to, date_from } = parse(search);
      const data = {
        date_to,
        date_from,
        category,
        lang
      };
      return renderStuff(data);
    } else {
      return renderStuff({ lang });
    }
  };

  const langAr = document.getElementById('langAr');
  langAr && langAr.addEventListener('click', langSelect('ar'));

  const langEn = document.getElementById('langEn');
  langEn && langEn.addEventListener('click', langSelect('en'));

  // event listener for category select in header

  // document
  //   .getElementById('categoryButton')
  //   .addEventListener('click', function() {
  //     document
  //       .getElementById('categorySelectContainer')
  //       .classList.toggle('hide');
  //   });

  // const categoriesDropdownList = document.getElementById('categorySelect');
  //
  // categoriesDropdownList.addEventListener('click', event => {
  //   const { value } = categoriesDropdownList.options[
  //     categoriesDropdownList.selectedIndex
  //   ];
  //   if (categoriesDropdownList.selectedIndex > 0) {
  //     const { pathname, search } = new URL(window.location.href);
  //     if (search) {
  //       const { date_to, date_from } = parse(search);
  //       data = {
  //         date_to,
  //         date_from,
  //         lang: pathname.split('/')[1],
  //         categories: value
  //       };
  //       renderStuff(data);
  //     } else {
  //       data = {
  //         lang: pathname.split('/')[1],
  //         categories: value
  //       };
  //       renderStuff(data);
  //     }
  //   }
  // });
}
