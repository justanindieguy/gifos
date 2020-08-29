function parseTitle(title) {
  const pos = title.indexOf(' GIF');

  return title.slice(0, pos);
}

export function parseGIFsData(gifData) {
  return {
    id: gifData.id,
    title: parseTitle(gifData.title),
    username: gifData.username,
    url: gifData.images.original.url,
    fixedHeightURL: gifData.images.fixed_height.url,
  };
}

export function checkLocalStorage(gifArray, item) {
  gifArray.splice(0, gifArray.length);

  if (localStorage.getItem(item) === null) {
    localStorage.setItem(item, '[]');
  }

  if (localStorage.getItem(item) !== '[]') {
    const gifsObtained = JSON.parse(localStorage.getItem(item));

    gifsObtained.forEach((gif) => gifArray.push(gif));
  }
}

export const getCardsIDs = (cardArray) => cardArray.map((card) => card.id);

export const seeingFavorites = () => document.URL.includes('favorites.html');
export const seeingMyGIFs = () => document.URL.includes('myGIFOS.html');

export const displayComponent = (component) =>
  (component.style.display = 'block');

export const hideComponent = (component) => (component.style.display = 'none');

export const displayComponents = (...components) =>
  components.forEach((component) => {
    component.style.display = 'block';
  });

export const hideComponents = (...components) =>
  components.forEach((component) => {
    component.style.display = 'none';
  });

export const isHidden = (component) => component.style.display === 'none';

export const isVisible = (component) => component.style.display === 'block';
