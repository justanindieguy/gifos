import { displayComponent, hideComponent } from '../utils/utils.js';

const gifMax = document.querySelector('#gif-max');

export class GenericCard {
  static gifMax = gifMax;
  static gifMaxImg = gifMax.querySelector('img');
  static gifMaxUser = gifMax.querySelector('h3');
  static gifMaxTitle = gifMax.querySelector('h2');
  static gifMaxDownloadBtn = gifMax.querySelector('#download');
  static gifMaxPrevBtn = gifMax.querySelector('#previous-max');
  static gifMaxNextBtn = gifMax.querySelector('#next-max');

  constructor(id, title, username, url, fixedHeightURL, index, type) {
    this.id = id;
    this.title = title;
    this.username = username;
    this.url = url;
    this.fixedHeightURL = fixedHeightURL;
    this.index = index;
    this.type = type;
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

  createCardInfo() {
    const text = document.createElement('div');
    text.classList.add('text');

    const username = document.createElement('h3');
    username.innerText = this.username;

    const title = document.createElement('h2');
    title.innerText = this.title;

    text.append(username, title);
    return text;
  }

  createCardBtn(...btnClasses) {
    const newBtn = document.createElement('button');

    btnClasses.forEach((btnClass) => newBtn.classList.add(btnClass));
    return newBtn;
  }

  createCardImg() {
    const gifImg = document.createElement('img');
    gifImg.src = this.fixedHeightURL;
    gifImg.alt = 'GIF Card Image';

    gifImg.classList.add('card-img');

    return gifImg;
  }

  createImgLoadingAnimation() {
    const loader = document.createElement('img');
    loader.src = '../gifos/images/loader.svg';
    loader.alt = 'Loading animation';
    loader.classList.add('loader');

    return loader;
  }

  checkImgLoad(gifImg) {
    gifImg.addEventListener('load', () => {
      if (window.innerWidth >= 1280) {
        this.htmlDesktopCard.classList.add('card-loaded');
      } else {
        this.htmlMobileCard.classList.add('card-loaded');
        this.expandGIFMobileEventListener();
      }

      this.loader.style.display = 'none';
      this.loader.style.animation = 'none';
    });
  }

  showFullSizeGIF() {
    displayComponent(GenericCard.gifMax);

    document.body.style.overflowY = 'hidden';

    GenericCard.gifMaxImg.src = '';
    GenericCard.gifMaxImg.src = this.url;

    GenericCard.gifMaxImg.alt = `${this.type} ${this.index}`;

    GenericCard.gifMaxUser.innerText = this.username;
    GenericCard.gifMaxTitle.innerText = this.title;

    if (this.index === 0) {
      hideComponent(GenericCard.gifMaxPrevBtn);
    } else {
      displayComponent(GenericCard.gifMaxPrevBtn);
    }

    this.prepareMaxAnchorTagForDownload();
  }

  hideGifMaxNextBtn(cardArray) {
    if (this.index === cardArray.length - 1) {
      hideComponent(GenericCard.gifMaxNextBtn);
    } else {
      displayComponent(GenericCard.gifMaxNextBtn);
    }
  }

  async getImage() {
    const res = await fetch(this.url);
    const gifBlob = await res.blob();

    return gifBlob;
  }

  prepareDownload() {
    this.getImage().then((blob) => {
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${this.id}.gif`;

      downloadLink.click();
    });
  }

  prepareMaxAnchorTagForDownload() {
    GenericCard.gifMaxDownloadBtn.href = 'javascript:void(0)';

    this.getImage().then((blob) => {
      const url = URL.createObjectURL(blob);
      GenericCard.gifMaxDownloadBtn.href = url;
      GenericCard.gifMaxDownloadBtn.download = `${this.id}.gif`;
    });
  }

  addDownloadEventListener() {
    this.downloadBtn.addEventListener('click', () => {
      this.prepareDownload();
    });
  }

  expandGIFMobileEventListener() {
    this.htmlMobileCard.addEventListener('click', () => {
      this.expandGIFMobileAction();
    });
  }
}
