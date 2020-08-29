import { searchNav, box as searchBox } from './dom/searchBoxSelectors.js';
import { getAndShowGIFs } from './searchGIFs.js';

searchNav.addEventListener('keyup', (evt) => {
  if (evt.which === 13) {
    searchBox.value = searchNav.value;
    getAndShowGIFs(searchNav.value);
  }
});
