import { checkLocalStorage } from '../utils/utils.js';

export const myGIFsLocalStrg = [];

export function pushToLocalStorage(gifID) {
  myGIFsLocalStrg.push(gifID);

  localStorage.setItem('myGIFs', JSON.stringify(myGIFsLocalStrg));
}

checkLocalStorage(myGIFsLocalStrg, 'myGIFs');
