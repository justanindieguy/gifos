import { uploadEndpoint, checkAndParse } from '../services/APIInteraction.js';
import { pushToLocalStorage } from '../myGIFs/myGIFs.js';

export async function uploadGIF(gif) {
  const res = await fetch(uploadEndpoint, {
    method: 'POST',
    body: gif,
  });

  const uploadResults = await checkAndParse(res);

  if (uploadResults.meta.status === 200) {
    pushToLocalStorage(uploadResults.data.id);

    return Promise.resolve(uploadResults.data.id);
  }

  return Promise.reject('Algo salió mal.');
}
