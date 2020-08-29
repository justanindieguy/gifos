import * as results from './dom/searchResultsSelectors.js';
import { allSearchCards } from './dom/gifCardsArrays.js';
import { box as searchBox } from './dom/searchBoxSelectors.js';
import { ResultCard as Card } from './entities/ResultCard.js';

import {
  API,
  searchEndpoint,
  checkAndParse,
} from './services/APIInteraction.js';

import {
  parseGIFsData,
  displayComponent,
  hideComponent,
  hideComponents,
} from './utils/utils.js';

const searchH1 = document.querySelector('#search h1');
const ilustration = document.querySelector('#ilustration');
const trendingTerms = document.querySelector('#trending-terms');
let offset = 12;
let newSearch;

async function searchGIFs(query, limit = 12, offset = 0) {
  const res = await fetch(
    API + searchEndpoint + `&q=${query}&limit=${limit}&offset=${offset}`
  );

  const searchResults = await checkAndParse(res);

  if (searchResults.data.length === 0) {
    throw { status: 13, msg: 'Term not found.' };
  }

  if (offset === 0) {
    allSearchCards.splice(0, allSearchCards.length);
  }

  for (let i = 0; i < searchResults.data.length; i += 1) {
    const data = parseGIFsData(searchResults.data[i]);
    const newCard = new Card(
      data.id,
      data.title,
      data.username,
      data.url,
      data.fixedHeightURL,
      i + offset,
      'Search result'
    );

    allSearchCards.push(newCard);

    if (window.innerWidth >= 1280) {
      results.grid.append(newCard.createCardDesktop());
    } else {
      results.grid.append(newCard.createCardMobile());
    }
  }

  return Promise.resolve();
}

export function getAndShowGIFs(query) {
  results.grid.innerHTML = '';
  hideComponents(results.results, results.notFound);
  displayComponent(results.container);
  results.title.innerText = query;
  newSearch = true;

  if (window.innerWidth >= 1280) {
    hideComponent(trendingTerms);
  } else {
    hideComponents(searchH1, ilustration);
  }

  searchGIFs(query, 12)
    .then(() => {
      displayComponent(results.results);
      window.location = '#search-container';
    })
    .catch((err) => {
      if (err.status === 13) {
        displayComponent(results.notFound);
        window.location = '#search-container';
      } else {
        console.error(err);
      }
    });
}

// Evento para el botón de ver más.
results.seeMoreBtn.addEventListener('click', () => {
  if (newSearch) {
    offset = 12;
  }

  searchGIFs(searchBox.value, 12, offset)
    .then(() => {
      newSearch = false;
      results.grid.children[offset].id = `offset-${offset}`;

      window.location = `#offset-${offset}`;

      offset += 12;
    })
    .catch((err) => console.error(err));
});
