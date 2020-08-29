import { showTrendingGIFsDesktop } from './trendingGIFs.js';

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

function hideShowArrows(slides, prevBtn, nextBtn, targetIdx) {
  if (targetIdx === 0) {
    prevBtn.classList.add('is-hidden');
    nextBtn.classList.remove('is-hidden');
  } else if (targetIdx === slides.length - 1) {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
    nextBtn.classList.remove('is-hidden');
  }
}

if (window.innerWidth >= 1280) {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.previous');
  let slides;

  showTrendingGIFsDesktop().then(() => {
    slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, i) =>
      (slide.style.left = `${slideWidth * i}px`);

    slides.forEach(setSlidePosition);
  });

  prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIdx = slides.findIndex((slide) => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevBtn, nextBtn, prevIdx);
  });

  nextBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIdx = slides.findIndex((slide) => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    hideShowArrows(slides, prevBtn, nextBtn, nextIdx);
  });
}
