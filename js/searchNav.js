import { searchNav, box as searchBox } from './dom/searchBoxSelectors.js';
import { getAndShowGIFs } from './searchGIFs.js';

const searchBtn = document.querySelector('#search-nav-btn');

searchNav.addEventListener('keyup', (evt) => {
  if (evt.which === 13) {
    searchBox.value = searchNav.value;
    getAndShowGIFs(searchNav.value);
  }
});

searchBtn.addEventListener('click', () => {
  if (searchNav.value) {
    getAndShowGIFs(searchNav.value);
  }
});
