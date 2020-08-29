import * as myGIFs from '../dom/myGIFsSelectors.js';
import { myGIFsLocalStrg } from './myGIFs.js';
import { allMyGIFs } from '../dom/gifCardsArrays.js';
import { MyGIFCard as Card } from '../entities/MyGIFCard.js';

import {
  API,
  gifsByIdEndpoint,
  checkAndParse,
} from '../services/APIInteraction.js';

import {
  displayComponent,
  hideComponent,
  parseGIFsData,
} from '../utils/utils.js';

async function getAllGIFsByID() {
  const res = await fetch(
    API + gifsByIdEndpoint + `&ids=${myGIFsLocalStrg.join(',')}`
  );

  const results = await checkAndParse(res);

  for (let i = 0; i < results.data.length; i += 1) {
    const data = parseGIFsData(results.data[i]);
    const newCard = new Card(
      data.id,
      data.title,
      data.username,
      data.url,
      data.fixedHeightURL,
      i,
      'My GIF',
      showAllUntilEnd
    );

    allMyGIFs.push(newCard);
  }
}

async function showMyGIFs(start, end) {
  await getAllGIFsByID();

  for (let i = start; i < end; i += 1) {
    if (window.innerWidth >= 1280) {
      myGIFs.grid.append(allMyGIFs[i].createCardDesktop());
    } else {
      myGIFs.grid.append(allMyGIFs[i].createCardMobile());
    }
  }
}

function showLoadedGIFs(start, end) {
  for (let i = start; i < end; i += 1) {
    if (window.innerWidth >= 1280) {
      myGIFs.grid.append(allMyGIFs[i].createCardDesktop());
    } else {
      myGIFs.grid.append(allMyGIFs[i].createCardMobile());
    }
  }
}

function showFirstGIFs() {
  if (myGIFsLocalStrg.length === 0) {
    hideComponent(myGIFs.gridSection);
    displayComponent(myGIFs.emptySection);
  } else {
    displayComponent(myGIFs.gridSection);

    if (myGIFsLocalStrg.length > 12) {
      displayComponent(myGIFs.seeMoreBtn);
    }

    const end = myGIFsLocalStrg.length >= 12 ? 12 : myGIFsLocalStrg.length;

    showMyGIFs(0, end);
  }
}

function showAllUntilEnd(pos) {
  myGIFs.grid.innerHTML = '';

  if (myGIFsLocalStrg.length === 0) {
    displayComponent(myGIFs.emptySection);
    hideComponent(myGIFs.gridSection);
    return;
  }

  if (myGIFsLocalStrg.length <= 12) {
    hideComponent(myGIFs.seeMoreBtn);
    end = myGIFsLocalStrg.length;
  } else if (myGIFsLocalStrg.length < end) {
    end -= 1;
  }

  allMyGIFs.splice(pos, 1);
  showLoadedGIFs(0, end);
}

function getEndAndUpdateBtn() {
  start = end;

  if (end + 12 <= myGIFsLocalStrg.length) {
    end += 12;
  } else {
    const excess = myGIFsLocalStrg.length - end;
    end += excess;
  }

  if (end === myGIFsLocalStrg.length) {
    hideComponent(myGIFs.seeMoreBtn);
  }
}

let start;
let end = 12;

showFirstGIFs();

myGIFs.seeMoreBtn.addEventListener('click', () => {
  getEndAndUpdateBtn();

  showMyGIFs(start, end);
});
