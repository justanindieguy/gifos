const nav = document.querySelector('nav');
const searchNavContainer = document.querySelector('.search-nav-container');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  if (scrollPos > 10) {
    if (!nav.classList.contains('is-sticky')) {
      nav.classList.add('is-sticky');
    }
  } else {
    if (nav.classList.contains('is-sticky')) {
      nav.classList.remove('is-sticky');
    }
  }

  if (window.innerWidth >= 1280) {
    const location = window.location.pathname;

    if (location === '/gifos/' || location === '/gifos/index.html') {
      if (scrollPos > 560) {
        if (searchNavContainer.classList.contains('is-hidden')) {
          searchNavContainer.classList.remove('is-hidden');
        }
      } else {
        searchNavContainer.classList.add('is-hidden');
      }
    }
  }
});
