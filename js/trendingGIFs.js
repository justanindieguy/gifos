import {
  API,
  trendingGIFsEndpoint,
  checkAndParse,
} from './services/APIInteraction.js';

import {
  showAllUntilEnd,
  showRemainingGIFs,
} from './favorites/favoritesPage.js';

import { allTrendingCards } from './dom/gifCardsArrays.js';
import { TrendingCard as Card } from './entities/TrendingCard.js';
import { parseGIFsData } from './utils/utils.js';

const track = document.querySelector('.carousel-track');

async function getTrendingGIFs(limit = 12) {
  const res = await fetch(API + trendingGIFsEndpoint + `&limit=${limit}`);

  const gifs = await checkAndParse(res);

  const gifCards = [];

  for (let i = 0; i < gifs.data.length; i += 1) {
    const data = parseGIFsData(gifs.data[i]);
    const newCard = new Card(
      data.id,
      data.title,
      data.username,
      data.url,
      data.fixedHeightURL,
      i,
      'Trending GIF',
      showAllUntilEnd,
      showRemainingGIFs
    );

    gifCards.push(newCard);
    allTrendingCards.push(newCard);
  }

  return gifCards;
}

function createCarouselSlide() {
  const carouselSlide = document.createElement('div');
  carouselSlide.classList.add('carousel-slide');

  return carouselSlide;
}

export async function showTrendingGIFsDesktop() {
  const gifCards = await getTrendingGIFs();

  const slides = [];

  for (let i = 0; i < gifCards.length; i += 1) {
    if (i % 3 === 0) {
      const slide = createCarouselSlide();

      if (i === 0) slide.classList.add('current-slide');

      slides.push(slide);
    }
  }

  let j = 0;
  for (let i = 0; i < gifCards.length; i += 1) {
    if (i % 3 === 0 && i !== 0) {
      j += 1;
    }

    slides[j].append(gifCards[i].createCardDesktop());
  }

  slides.forEach((slide) => track.append(slide));

  return Promise.resolve();
}

async function showTrendingGIFsMobile() {
  const gifCards = await getTrendingGIFs();

  gifCards.forEach((card) => track.append(card.createCardMobile()));

  return Promise.resolve();
}

if (window.innerWidth < 1280) {
  showTrendingGIFsMobile();
}
