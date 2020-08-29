import { timer } from "../dom/createGIFSelectors.js";

import { displayComponent } from "../utils/utils.js";

let counter = 0;
let interval;

const numberFormat = (num) => (num < 10 ? "0" + num : num);

function convertSeconds(seconds) {
  let hours = Math.floor(seconds / 3600);
  let min = Math.floor((seconds % 3600) / 60);
  let sec = seconds % 60;

  return `${numberFormat(hours)}:${numberFormat(min)}:${numberFormat(sec)}`;
}

function timeIt() {
  counter++;
  timer.innerText = convertSeconds(counter);
}

export function setupTimer() {
  counter = 0;

  displayComponent(timer);
  timer.innerText = "00:00:00";

  interval = setInterval(timeIt, 1000);
}

export function stopTimer() {
  clearInterval(interval);
}
