import { CommonCard } from './CommonCard.js';
import { allFavoriteGIFs } from '../dom/gifCardsArrays.js';
import { favoritesGrid, favoritesShow } from '../dom/favoritesSelectors.js';
import { allTrendingCards } from '../dom/gifCardsArrays.js';

import {
  hideComponent,
  displayComponent,
  getCardsIDs,
  isVisible,
} from '../utils/utils.js';

export class FavoriteCard extends CommonCard {
  constructor(
    id,
    title,
    username,
    url,
    fixedHeightURL,
    index,
    type,
    showAllUntilEnd
  ) {
    super(id, title, username, url, fixedHeightURL, index, type);
    this.showAllUntilEnd = showAllUntilEnd;
  }

  createCardDesktop() {
    super.createCardDesktop();
    this.addFavoriteEventListener();

    return this.htmlDesktopCard;
  }

  showFullSizeGIF() {
    super.showFullSizeGIF();

    this.hideGifMaxNextBtn(allFavoriteGIFs);
  }

  isInTrending() {
    const trendingIDs = getCardsIDs(allTrendingCards);

    return trendingIDs.indexOf(this.id) !== -1;
  }

  favBtnEventAction() {
    this.removeFromFavorites();

    if (isVisible(FavoriteCard.gifMax)) {
      hideComponent(FavoriteCard.gifMax);
      document.body.style.overflowY = 'auto';
    }

    if (this.index === allFavoriteGIFs.length - 1) {
      favoritesGrid.removeChild(favoritesGrid.lastElementChild);
      allFavoriteGIFs.pop();

      if (allFavoriteGIFs.length === 0) {
        hideComponent(favoritesShow);
        displayComponent(favoritesEmpty);
      }
    } else {
      this.showAllUntilEnd();
    }

    this.isInTrending();

    if (this.isInTrending()) {
      const trendingIDs = getCardsIDs(allTrendingCards);
      const pos = trendingIDs.indexOf(this.id);

      allTrendingCards[pos].updateFavBtnToNotInFavorites();
    }
  }

  addFavoriteEventListener() {
    this.favoriteBtn.addEventListener('click', () => {
      this.favBtnEventAction();
    });
  }
}
