import { FavoriteCard as Card } from '../entities/FavoriteCard.js';
import { favoriteGIFsLocalStrg } from './favorites.js';
import { allFavoriteGIFs } from '../dom/gifCardsArrays.js';

import {
  favoritesGrid,
  favoritesEmpty,
  favoritesShow,
  seeMoreFavorites,
} from '../dom/favoritesSelectors.js';

import {
  displayComponent,
  hideComponent,
  seeingFavorites,
} from '../utils/utils.js';

function getAllFavoritesGIFs() {
  for (let i = 0; i < favoriteGIFsLocalStrg.length; i += 1) {
    const newCard = new Card(
      favoriteGIFsLocalStrg[i].id,
      favoriteGIFsLocalStrg[i].title,
      favoriteGIFsLocalStrg[i].username,
      favoriteGIFsLocalStrg[i].url,
      favoriteGIFsLocalStrg[i].fixedHeightURL,
      i,
      'Favorite GIF',
      showAllUntilEnd
    );

    allFavoriteGIFs.push(newCard);
  }
}

function showGeneratedGIFs(start, end) {
  getAllFavoritesGIFs();

  for (let i = start; i < end; i += 1) {
    if (window.innerWidth >= 1280) {
      favoritesGrid.append(allFavoriteGIFs[i].createCardDesktop());
    } else {
      favoritesGrid.append(allFavoriteGIFs[i].createCardMobile());
    }
  }
}

export function showRemainingGIFs() {
  if (allFavoriteGIFs.length > 12) {
    for (let i = 12; i < allFavoriteGIFs.length; i += 1) {
      if (window.innerWidth >= 1280) {
        favoritesGrid.append(allFavoriteGIFs[i].createCardDesktop());
      } else {
        favoritesGrid.append(allFavoriteGIFs[i].createCardMobile());
      }
    }

    hideComponent(seeMoreFavorites);
  }

  return true;
}

function showFirstGIFs() {
  if (favoriteGIFsLocalStrg.length === 0) {
    hideComponent(favoritesShow);
    displayComponent(favoritesEmpty);
  } else {
    displayComponent(favoritesShow);

    if (favoriteGIFsLocalStrg.length > 12) {
      displayComponent(seeMoreFavorites);
    }
  }

  const end =
    favoriteGIFsLocalStrg.length >= 12 ? 12 : favoriteGIFsLocalStrg.length;

  showGeneratedGIFs(0, end);
}

export function updateAllFavoriteGIFs() {
  allFavoriteGIFs.splice(0, allFavoriteGIFs.length);

  for (let i = 0; i < favoriteGIFsLocalStrg.length; i += 1) {
    allFavoriteGIFs.push(
      new Card(
        favoriteGIFsLocalStrg[i].id,
        favoriteGIFsLocalStrg[i].title,
        favoriteGIFsLocalStrg[i].username,
        favoriteGIFsLocalStrg[i].url,
        favoriteGIFsLocalStrg[i].fixedHeightURL,
        i,
        'Favorite GIF',
        showAllUntilEnd
      )
    );
  }
}

export function showAllUntilEnd() {
  favoritesGrid.innerHTML = '';

  if (favoriteGIFsLocalStrg.length === 0) {
    displayComponent(favoritesEmpty);
    hideComponent(favoritesShow);
    return;
  }

  if (favoriteGIFsLocalStrg.length <= 12) {
    hideComponent(seeMoreFavorites);
    end = favoriteGIFsLocalStrg.length;
  } else if (favoriteGIFsLocalStrg.length < end) {
    end -= 1;
  }

  updateAllFavoriteGIFs();
  showGeneratedGIFs(0, end);
}

function getEndAndUpdateBtn() {
  start = end;

  if (end + 12 <= favoriteGIFsLocalStrg.length) {
    end += 12;
  } else {
    const excess = favoriteGIFsLocalStrg.length - end;
    end += excess;
  }

  if (end === favoriteGIFsLocalStrg.length) {
    hideComponent(seeMoreFavorites);
  }
}

let start;
let end = 12;

if (seeingFavorites()) {
  showFirstGIFs();

  seeMoreFavorites.addEventListener('click', () => {
    getEndAndUpdateBtn();

    showGeneratedGIFs(start, end);
  });
}
