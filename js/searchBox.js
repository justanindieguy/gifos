import {
  apiKey,
  API,
  suggestionsEndpoint,
  checkAndParse,
} from './services/APIInteraction.js';

import * as searchBox from './dom/searchBoxSelectors.js';
import { getAndShowGIFs } from './searchGIFs.js';
import { displayComponent, hideComponent } from './utils/utils.js';

let closed = false;

// Obtiene sugerencias de búsqueda por medio de la API de GIPHY.
async function getSearchSuggestions(term) {
  const res = await fetch(
    API + suggestionsEndpoint + apiKey + `&q=${encodeURI(term)}`
  );

  const results = await checkAndParse(res);

  if (results.data.length != 0) {
    const length = results.data.length >= 4 ? 4 : results.data.length;

    for (let i = 0; i < length; i += 1) {
      displayComponent(searchBox.suggestionTerms[i]);
      searchBox.suggestionTerms[i].innerText = results.data[i].name;
    }

    if (length < 4) {
      const diff = 4 - length;

      for (let i = length; i <= diff; i += 1) {
        hideComponent(searchBox.suggestionTerms[i]);
      }
    }
  }

  return Promise.resolve();
}

// Oculta las sugerencias. Se utiliza cuando se presiona el botón de cerrar
// o no hay nada escrito dentro del search box.
function hideSuggestions() {
  searchBox.container.classList.remove('open');

  setTimeout(() => {
    searchBox.container.classList.remove('border');
  }, 250);

  closed = true;
}

function showSuggestions() {
  searchBox.container.classList.add('open');
  searchBox.container.classList.add('border');

  closed = false;
}

// Animación del search box.
searchBox.box.addEventListener('keyup', () => {
  if (!searchBox.box.validity.valid) {
    hideSuggestions();
  } else {
    showSuggestions();
  }
});

// Request a la API de Giphy para obtener sugerencias de búsqueda.
searchBox.box.addEventListener('input', () => {
  if (searchBox.box.value) {
    getSearchSuggestions(searchBox.box.value).catch((err) =>
      console.error(err)
    );
  }

  // Esta variable sirve para volver al valor original en caso de que se
  // seleccione otra opción con las flechas del teclado.
  initialValue = searchBox.box.value;
});

// Funcionalidad para seleccionar sugerencia con las flechas del teclado.
let liSelected = -1;
let initialValue;

// Permite elegir un elemento de las sugerencias con las flechas del teclado.
searchBox.box.addEventListener('keydown', (evt) => {
  if (evt.which === 40) {
    // Evento para tecla de flecha hacía abajo.
    if (liSelected < 3) {
      liSelected += 1;

      searchBox.suggestionsLi[liSelected].classList.add('active');

      searchBox.box.value =
        searchBox.suggestionsLi[liSelected].children[0].innerText;

      if (liSelected >= 1) {
        searchBox.suggestionsLi[liSelected - 1].classList.remove('active');
      }
    }
  } else if (evt.which === 38) {
    // Evento para tecla de flecha hacía arriba.
    if (liSelected > 0) {
      liSelected -= 1;

      searchBox.suggestionsLi[liSelected].classList.add('active');

      searchBox.box.value =
        searchBox.suggestionsLi[liSelected].children[0].innerText;

      searchBox.suggestionsLi[liSelected + 1].classList.remove('active');
    } else if (liSelected === 0) {
      searchBox.box.value = initialValue;

      searchBox.suggestionsLi[liSelected].classList.remove('active');
      liSelected = -1;
    }

    let pos = searchBox.box.selectionStart;
    searchBox.box.selectionStart = pos;
    evt.preventDefault();
  } else {
    if (liSelected !== -1) {
      searchBox.suggestionsLi[liSelected].classList.remove('active');
      liSelected = -1;
    }
  }
});

// Si se presiona la tecla enter, oculta las sugerencias y realiza búsqueda.
searchBox.box.addEventListener('keyup', (evt) => {
  if (evt.which === 13) {
    hideSuggestions();

    searchBox.searchNav.value = searchBox.box.value;
    getAndShowGIFs(searchBox.box.value);
  }
});

// Funcionalidad del botón de búsqueda.
searchBox.btn.addEventListener('click', () => {
  if (searchBox.box.value && !closed) {
    hideSuggestions();
  } else if (searchBox.box.value && closed) {
    getAndShowGIFs(searchBox.box.value);
  }
});

// Añade evento de click para que al presionar una sugerencia se haga la búsqueda.
searchBox.suggestions.addEventListener('click', (evt) => {
  const targetSuggestion = evt.target.closest('.suggestion-text');

  if (!targetSuggestion) return;

  hideSuggestions();
  getAndShowGIFs(targetSuggestion.innerText);
});
