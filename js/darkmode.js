const darkToggle = document.querySelector('#dark-toggle');

function checkDarkModeLocalStorage() {
  if (darkModeActive) {
    document.body.classList.add('dark-mode');

    darkToggle.innerText = 'Modo diurno';
  } else {
    document.body.classList.remove('dark-mode');

    darkToggle.innerText = 'Modo nocturno';
  }
}

let darkModeActive;
let localStorageStr = window.localStorage.getItem('darkModeActive');

if (localStorageStr === null) {
  darkModeActive = false;
} else {
  localStorageStr === 'false'
    ? (darkModeActive = false)
    : (darkModeActive = true);
}

checkDarkModeLocalStorage();

darkToggle.addEventListener('click', () => {
  if (!darkModeActive) {
    document.body.classList.add('dark-mode');

    window.localStorage.setItem('darkModeActive', true);

    darkToggle.innerText = 'Modo diurno';
    darkModeActive = true;
  } else {
    document.body.classList.remove('dark-mode');

    window.localStorage.setItem('darkModeActive', false);

    darkToggle.innerText = 'Modo nocturno';
    darkModeActive = false;
  }
});
