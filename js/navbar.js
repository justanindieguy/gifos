const menuToggle = document.querySelector('#toggle');
const menu = document.querySelector('#menu');
const toggle = document.querySelector('#toggle');

toggle.addEventListener('click', () => {
  if (menuToggle.checked) {
    document.body.style.overflowY = 'hidden';
    document.body.style.height = '100%';
  } else {
    document.body.style.overflowY = 'visible';
  }

  menu.classList.toggle('show');
});
