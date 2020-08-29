import { CommonCard } from './CommonCard.js';
import { FavoriteCard } from './FavoriteCard.js';
import { allFavoriteGIFs } from '../dom/gifCardsArrays.js';
import { allTrendingCards } from '../dom/gifCardsArrays.js';

import {
  seeingFavorites,
  hideComponent,
  displayComponent,
  isVisible,
} from '../utils/utils.js';

import {
  favoritesEmpty,
  favoritesShow,
  favoritesGrid,
} from '../dom/favoritesSelectors.js';

export class TrendingCard extends CommonCard {
  static allGIFsInGrid = false;

  constructor(
    id,
    title,
    username,
    url,
    fixedHeightURL,
    index,
    type,
    showAllUntilEnd,
    showRemainingGIFs
  ) {
    super(id, title, username, url, fixedHeightURL, index, type);
    this.showAllUntilEnd = showAllUntilEnd;
    this.showRemainingGIFs = showRemainingGIFs;
  }

  createCardDesktop() {
    super.createCardDesktop();
    this.addFavoriteEventListener();

    return this.htmlDesktopCard;
  }

  showFullSizeGIF() {
    super.showFullSizeGIF();

    this.hideGifMaxNextBtn(allTrendingCards);
  }

  appendCardToGrid() {
    const newFavCard = new FavoriteCard(
      this.id,
      this.title,
      this.username,
      this.url,
      this.fixedHeightURL,
      allFavoriteGIFs.length,
      'Favorite GIF',
      this.showAllUntilEnd
    );

    if (window.innerWidth >= 1280) {
      favoritesGrid.append(newFavCard.createCardDesktop());
    } else {
      favoritesGrid.append(newFavCard.createCardMobile());
    }

    allFavoriteGIFs.push(newFavCard);
  }

  favBtnEventAction() {
    if (!this.isInFavorites()) {
      if (isVisible(TrendingCard.gifMax)) {
        this.updateFavMaxBtnToInFavorites();
      }

      this.updateFavBtnToInFavorites();
      this.pushToFavorites();

      if (seeingFavorites()) {
        if (allFavoriteGIFs.length === 0) {
          hideComponent(favoritesEmpty);
          displayComponent(favoritesShow);
        }

        if (TrendingCard.allGIFsInGrid) {
          this.appendCardToGrid();
        } else {
          TrendingCard.allGIFsInGrid = this.showRemainingGIFs();
          this.appendCardToGrid();
        }
      }
    } else {
      if (isVisible(TrendingCard.gifMax)) {
        this.updateFavMaxBtnToNotInFavorites();
      }

      this.updateFavBtnToNotInFavorites();
      this.removeFromFavorites();

      if (seeingFavorites()) {
        this.showAllUntilEnd();
      }
    }
  }

  addFavoriteEventListener() {
    this.favoriteBtn.addEventListener('click', () => {
      this.favBtnEventAction();
    });
  }
}
