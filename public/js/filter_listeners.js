/* global URL type:true axios */
/* eslint no-global-assign: "error" */
import { renderStuff } from './template';
import parse from 'webpack-parse-query';

export function initEventListeners() {
  const langSelect = lang => event => {
    event.preventDefault();
    document
      .getElementById('langAr')
      .classList.toggle('header__options__dialogue__link--active');

    document
      .getElementById('langEn')
      .classList.toggle('header__options__dialogue__link--active');
    window.location.href = `/${lang}`;
  };

  const langAr = document.getElementById('langAr');
  langAr && langAr.addEventListener('click', langSelect('ar'));

  const langEn = document.getElementById('langEn');
  langEn && langEn.addEventListener('click', langSelect('en'));

  const toggleCategoriesList = document.getElementById('toggleCategorySelect');
  toggleCategoriesList &&
    toggleCategorySelect.addEventListener('click', () => {
      document.getElementById('categoriesSelect').classList.toggle('hide');
    });

  const toggleSearchBar = document.getElementById('toggleSearchBar');
  toggleSearchBar &&
    toggleSearchBar.addEventListener('click', () => {
      document.getElementById('searchBar').classList.toggle('hide');
    });
}
