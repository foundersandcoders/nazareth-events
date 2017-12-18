import { state } from './template';

export function initEventListeners() {
  const langSelect = lang => event => {
    event.preventDefault();

    const { search } = new URL(window.location.href);
    if (search) {
      window.location.href = `/${lang}${search}`;
    } else {
      window.location.href = `/${lang}`;
    }
    const langAr = document.getElementById('langAr');
  };
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
