import { getAndShowGIFs } from './searchGIFs.js';
import { searchNav, box as searchBox } from './dom/searchBoxSelectors.js';

import {
  API,
  trendingEndpoint,
  checkAndParse,
} from './services/APIInteraction.js';

const trendingText = document.querySelector('#trending-text');

async function getTrendingTerms() {
  const res = await fetch(API + trendingEndpoint);
  const terms = await checkAndParse(res);

  const mainTerms = [];

  for (let i = 0; i < 5; i += 1) {
    mainTerms.push(terms.data[i]);

    const currentTerm = document.createElement('span');
    currentTerm.classList.add('trending-term');

    if (i !== 4) {
      currentTerm.innerHTML = `${terms.data[i]}, `;
    } else {
      currentTerm.innerHTML = `${terms.data[i]}`;
    }

    trendingText.append(currentTerm);
  }
}

getTrendingTerms()
  .then(() => {
    trendingText.addEventListener('click', (evt) => {
      const targetTerm = evt.target.closest('span');

      if (!targetTerm) return;

      const strings = targetTerm.innerText.split(',');
      const term = strings[0];

      searchNav.value = term;
      searchBox.value = term;
      getAndShowGIFs(term);
    });
  })
  .catch((err) => console.error(err));
