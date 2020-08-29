import { GenericCard } from './GenericCard.js';
import { myGIFsLocalStrg } from '../myGIFs/myGIFs.js';
import { allMyGIFs } from '../dom/gifCardsArrays.js';
import { grid, gridSection, emptySection } from '../dom/myGIFsSelectors.js';
import { hideComponent, displayComponent, isVisible } from '../utils/utils.js';

export class MyGIFCard extends GenericCard {
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
    const card = document.createElement('div');
    card.classList.add('card');

    const loader = this.createImgLoadingAnimation();
    this.loader = loader;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const text = this.createCardInfo();

    const removeBtn = this.createCardBtn('remove', 'card-btn');
    this.removeBtn = removeBtn;

    const downloadBtn = this.createCardBtn('download', 'card-btn');
    this.downloadBtn = downloadBtn;

    const expandBtn = this.createCardBtn('expand', 'card-btn');
    this.expandBtn = expandBtn;

    const gifImg = this.createCardImg();

    card.append(
      loader,
      overlay,
      text,
      removeBtn,
      downloadBtn,
      expandBtn,
      gifImg
    );

    this.htmlDesktopCard = card;

    this.checkImgLoad(gifImg);
    this.addRemoveEventListener();
    this.addDownloadEventListener();
    this.expandGIFDesktopEventListener();

    return this.htmlDesktopCard;
  }

  showFullSizeGIF() {
    super.showFullSizeGIF();

    this.hideGifMaxNextBtn(allMyGIFs);
  }

  removeFromMyGIFs() {
    const pos = myGIFsLocalStrg.indexOf(this.id);

    myGIFsLocalStrg.splice(pos, 1);

    localStorage.setItem('myGIFs', JSON.stringify(myGIFsLocalStrg));

    return pos;
  }

  removeBtnEventAction() {
    const pos = this.removeFromMyGIFs();

    if (isVisible(MyGIFCard.gifMax)) {
      hideComponent(MyGIFCard.gifMax);
      document.body.style.overflowY = 'auto';
    }

    if (this.index === allMyGIFs.length - 1) {
      grid.removeChild(grid.lastElementChild);
      allMyGIFs.pop();

      if (allMyGIFs.length === 0) {
        hideComponent(gridSection);
        displayComponent(emptySection);
      }
    } else {
      this.showAllUntilEnd(pos);
    }
  }

  addRemoveEventListener() {
    this.removeBtn.addEventListener('click', () => {
      this.removeBtnEventAction();
    });
  }

  expandGIFDesktopEventListener() {
    this.expandBtn.addEventListener('click', () => {
      this.showFullSizeGIF();
    });
  }

  expandGIFMobileAction() {
    this.showFullSizeGIF();
  }
}
