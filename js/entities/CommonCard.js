import { GenericCard } from './GenericCard.js';
import { getCardsIDs } from '../utils/utils.js';
import { favoriteGIFsLocalStrg } from '../favorites/favorites.js';

const gifMax = document.querySelector('#gif-max');

export class CommonCard extends GenericCard {
  static gifMaxFavBtn = gifMax.querySelector('#favorite');

  constructor(id, title, username, url, fixedHeightURL, index, type) {
    super(id, title, username, url, fixedHeightURL, index, type);
  }

  createCardDesktop() {
    const card = document.createElement('div');
    card.classList.add('card');

    const loader = this.createImgLoadingAnimation();
    this.loader = loader;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const text = this.createCardInfo();

    const favoriteBtn = this.createCardBtn('favorite', 'card-btn');
    this.favoriteBtn = favoriteBtn;

    const downloadBtn = this.createCardBtn('download', 'card-btn');
    this.downloadBtn = downloadBtn;

    const expandBtn = this.createCardBtn('expand', 'card-btn');
    this.expandBtn = expandBtn;

    const gifImg = this.createCardImg();

    card.append(
      loader,
      overlay,
      text,
      favoriteBtn,
      downloadBtn,
      expandBtn,
      gifImg
    );

    this.htmlDesktopCard = card;

    this.checkImgLoad(gifImg);
    this.checkAndUpdateFavBtn();
    this.addDownloadEventListener();
    this.expandGIFDesktopEventListener();
  }

  createCardMobile() {
    const card = document.createElement('div');
    card.classList.add('card');

    const loader = this.createImgLoadingAnimation();
    this.loader = loader;

    const gifImg = this.createCardImg();

    card.append(loader, gifImg);

    this.htmlMobileCard = card;

    this.checkImgLoad(gifImg);

    return card;
  }

  isInFavorites() {
    const favoritesIDs = getCardsIDs(favoriteGIFsLocalStrg);

    return favoritesIDs.indexOf(this.id) !== -1;
  }

  pushToFavorites() {
    favoriteGIFsLocalStrg.push({
      id: this.id,
      title: this.title,
      username: this.username,
      url: this.url,
      fixedHeightURL: this.fixedHeightURL,
    });

    localStorage.setItem('favorites', JSON.stringify(favoriteGIFsLocalStrg));
  }

  removeFromFavorites() {
    const favoritesIDs = getCardsIDs(favoriteGIFsLocalStrg);
    const pos = favoritesIDs.indexOf(this.id);

    favoriteGIFsLocalStrg.splice(pos, 1);

    localStorage.setItem('favorites', JSON.stringify(favoriteGIFsLocalStrg));
  }

  updateFavBtnToInFavorites() {
    if (window.innerWidth >= 1280) {
      this.favoriteBtn.style.backgroundImage =
        'url("../gifos/images/icon-fav-active.svg")';
    }
  }

  updateFavBtnToNotInFavorites() {
    if (window.innerWidth >= 1280) {
      this.favoriteBtn.style.backgroundImage =
        'url("../gifos/images/icon-fav-hover.svg")';
    }
  }

  checkAndUpdateFavBtn() {
    if (this.isInFavorites()) {
      this.updateFavBtnToInFavorites();
    } else {
      this.updateFavBtnToNotInFavorites();
    }
  }

  updateFavMaxBtnToInFavorites() {
    CommonCard.gifMaxFavBtn.classList.add('in-favorites');
  }

  updateFavMaxBtnToNotInFavorites() {
    CommonCard.gifMaxFavBtn.classList.remove('in-favorites');
  }

  checkAndUpdateFavMaxBtn() {
    if (this.isInFavorites()) {
      this.updateFavMaxBtnToInFavorites();
    } else {
      this.updateFavMaxBtnToNotInFavorites();
    }
  }

  showFullSizeGIF() {
    super.showFullSizeGIF();

    this.checkAndUpdateFavMaxBtn();
  }

  expandGIFDesktopEventListener() {
    this.expandBtn.addEventListener('click', () => {
      this.showFullSizeGIF();
    });
  }

  expandGIFMobileAction() {
    this.showFullSizeGIF();
    this.checkAndUpdateFavBtn();
  }
}
