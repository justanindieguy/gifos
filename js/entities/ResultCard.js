import { CommonCard } from './CommonCard.js';
import { isVisible } from '../utils/utils.js';
import { allSearchCards } from '../dom/gifCardsArrays.js';

export class ResultCard extends CommonCard {
  constructor(id, title, username, url, fixedHeightURL, index, type) {
    super(id, title, username, url, fixedHeightURL, index, type);
  }

  createCardDesktop() {
    super.createCardDesktop();
    this.addFavoriteEventListener();

    return this.htmlDesktopCard;
  }

  showFullSizeGIF() {
    super.showFullSizeGIF();

    this.hideGifMaxNextBtn(allSearchCards);
  }

  favBtnEventAction() {
    if (!this.isInFavorites()) {
      if (isVisible(ResultCard.gifMax)) {
        this.updateFavMaxBtnToInFavorites();
      }

      this.updateFavBtnToInFavorites();
      this.pushToFavorites();
    } else {
      if (isVisible(ResultCard.gifMax)) {
        this.updateFavMaxBtnToNotInFavorites();
      }

      this.updateFavBtnToNotInFavorites();
      this.removeFromFavorites();
    }
  }

  addFavoriteEventListener() {
    this.favoriteBtn.addEventListener('click', () => {
      this.favBtnEventAction();
    });
  }
}
