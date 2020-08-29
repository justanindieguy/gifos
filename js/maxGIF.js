import * as cardArray from './dom/gifCardsArrays.js';
import { hideComponent, isVisible, seeingMyGIFs } from './utils/utils.js';

const gifFullSize = document.querySelector('#gif-max');
const gifImgFullSize = gifFullSize.querySelector('#gif-container-max img');
const closeBtn = gifFullSize.querySelector('#close-max');
const favoriteBtn = gifFullSize.querySelector('#favorite');
const removeBtn = gifFullSize.querySelector('#remove');
const previousBtn = gifFullSize.querySelector('#previous-max');
const nextBtn = gifFullSize.querySelector('#next-max');

function getCardType() {
  const gifInfo = gifImgFullSize.alt;
  const matches = gifInfo.match(/(\d+)/);

  return gifInfo.slice(0, matches.index).trim();
}

function getCardIndex() {
  const gifInfo = gifImgFullSize.alt;
  const matches = gifInfo.match(/(\d+)/);

  return parseInt(matches[0]);
}

function traverseArray(previous, cardArray, index) {
  if (previous) {
    if (index > 0) {
      cardArray[index - 1].showFullSizeGIF();
    }
  } else {
    if (index < cardArray.length - 1) {
      cardArray[index + 1].showFullSizeGIF();
    }
  }
}

function navigateGIFs(previous) {
  const cardType = getCardType();
  const cardIndex = getCardIndex();

  switch (cardType) {
    case 'Trending GIF':
      traverseArray(previous, cardArray.allTrendingCards, cardIndex);
      break;
    case 'Search result':
      traverseArray(previous, cardArray.allSearchCards, cardIndex);
      break;
    case 'Favorite GIF':
      traverseArray(previous, cardArray.allFavoriteGIFs, cardIndex);
      break;
    case 'My GIF':
      traverseArray(previous, cardArray.allMyGIFs, cardIndex);
      break;
  }
}

if (window.innerWidth < 1280) {
  previousBtn.classList.add('nav-mobile');
  previousBtn.classList.add('prev-mobile');

  nextBtn.classList.add('nav-mobile');
  nextBtn.classList.add('next-mobile');
} else {
  previousBtn.classList.add('previous');
  previousBtn.classList.add('hover-btn');

  nextBtn.classList.add('next');
  nextBtn.classList.add('hover-btn');
}

closeBtn.addEventListener('click', () => {
  document.body.style.overflowY = 'auto';
  hideComponent(gifFullSize);
});

previousBtn.addEventListener('click', () => {
  navigateGIFs(true);
});

nextBtn.addEventListener('click', () => {
  navigateGIFs(false);
});

if (!seeingMyGIFs()) {
  favoriteBtn.addEventListener('click', () => {
    const cardType = getCardType();
    const cardIndex = getCardIndex();

    switch (cardType) {
      case 'Trending GIF':
        cardArray.allTrendingCards[cardIndex].favBtnEventAction();
        break;
      case 'Search result':
        cardArray.allSearchCards[cardIndex].favBtnEventAction();
        break;
      case 'Favorite GIF':
        cardArray.allFavoriteGIFs[cardIndex].favBtnEventAction();
        break;
    }
  });
} else {
  removeBtn.addEventListener('click', () => {
    const cardIndex = getCardIndex();

    cardArray.allMyGIFs[cardIndex].removeBtnEventAction();
  });
}

if (window.innerWidth >= 1280) {
  document.body.addEventListener('keydown', (evt) => {
    switch (evt.which) {
      case 27:
        if (isVisible(gifFullSize)) {
          document.body.style.overflowY = 'auto';
          hideComponent(gifFullSize);
        }
        break;
      case 37:
        if (isVisible(gifFullSize)) {
          navigateGIFs(true);
        }
        break;
      case 39:
        if (isVisible(gifFullSize)) {
          navigateGIFs(false);
        }
        break;
    }
  });
}
