import {
  displayComponent,
  hideComponent,
  displayComponents,
  hideComponents,
} from '../utils/utils.js';

import {
  video,
  recordedContainer,
  recordedGIF,
  recordBtn,
  uploadBtn,
  rerecord,
  instructionsContainer,
  instructionsTitle,
  instructionsP,
  stepOne,
  stepTwo,
  stepThree,
  uploadInfo,
  loader,
} from '../dom/createGIFSelectors.js';

import { uploadGIF } from './upload.js';
import { setupTimer, stopTimer } from '../services/timer.js';

const myGIFLink = document.querySelector('#link-create');
const myGIFDownload = document.querySelector('#download-create');
let stream = null;

const constraints = {
  audio: false,
  video: {
    width: 640,
    height: 360,
  },
};

async function initWebcam() {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);

    handleSuccess(stream);

    return Promise.resolve(stream);
  } catch (err) {
    throw new Error('Algo salió mal');
  }
}

const initRecorder = () =>
  new Promise((resolve, reject) => {
    initWebcam().then((stream) => {
      const recorder = RecordRTC(stream, {
        type: 'gif',
        mimeType: 'video/webm',
        recorderType: GifRecorder,
        disableLogs: true,
        quality: 6,
        width: 640,
        height: 360,
        onGifRecordingStarted: function () {
          recordBtn.innerText = 'FINALIZAR';
          stepOne.classList.remove('active');
          stepTwo.classList.add('active');

          hideComponents(rerecord, recordedContainer, uploadBtn);
          displayComponents(video, recordBtn);

          setupTimer();
          video.play();
        },
      });

      if (recorder) {
        resolve(recorder);
      } else {
        reject('Cannot create recorder object.');
      }
    });
  });

function handleSuccess(stream) {
  video.srcObject = stream;

  video.onloadedmetadata = () => {
    video.play();
  };
}

function updateCreateGIFPage() {
  stepOne.classList.add('active');
  instructionsTitle.innerHTML = '¿Nos das acceso<br />a tu cámara?';
  instructionsP.innerHTML =
    'El acceso a tu camara será válido sólo<br />por el tiempo en el que estés creando el GIFO';

  hideComponent(recordBtn);

  initWebcam()
    .then(() => {
      setTimeout(() => video.pause(), 50);

      hideComponent(instructionsContainer);
      displayComponents(video, recordBtn);

      recordBtn.innerText = 'GRABAR';
    })
    .catch((err) => {
      instructionsTitle.innerText = err;
      instructionsP.innerHTML =
        'Por favor, comprueba que hayas dado<br />acceso a la cámara en los ajustes de tu navegador';
    });
}

function stopRecord(recorder, blob) {
  if (recorder) {
    stopTimer();
    video.pause();

    hideComponents(video, timer);
    displayComponents(rerecord, recordedContainer);

    recorder.stopRecording(() => {
      blob = recorder.getBlob();
      recordedGIF.src = URL.createObjectURL(blob);
    });

    recorder.destroy();

    hideComponent(recordBtn);
    displayComponent(uploadBtn);

    return blob;
  } else {
    console.log('Something went wrong...');
  }
}

async function prepareDownload(blob, gifID) {
  const url = URL.createObjectURL(blob);
  myGIFDownload.href = url;
  myGIFDownload.download = `${gifID}.gif`;
}

let recorderObj;
let blob = null;

recordBtn.addEventListener('click', function () {
  if (video.src === '' && video.currentTime === 0) {
    updateCreateGIFPage();
  } else if (this.innerText === 'GRABAR') {
    initRecorder()
      .then((recorder) => {
        recorderObj = recorder;
        recorderObj.startRecording();
      })
      .catch((err) => console.error(err));
  } else if (recorderObj.state === 'recording') {
    blob = stopRecord(recorderObj, blob);
  }
});

rerecord.addEventListener('click', () => {
  initRecorder()
    .then((recorder) => {
      recorderObj = recorder;
      recorderObj.startRecording();
    })
    .catch((err) => console.error(err));
});

uploadBtn.addEventListener('click', () => {
  if (blob.type === 'image/gif' && blob.size !== 0) {
    let form = new FormData();

    form.append('file', blob, 'myGIF.gif');

    recordedContainer.classList.add('uploading');

    hideComponent(rerecord);
    stepTwo.classList.remove('active');
    stepThree.classList.add('active');

    // Finaliza el permiso para acceder a la cámara web.
    stream.getTracks().forEach((track) => {
      track.stop();
    });

    uploadGIF(form)
      .then((id) => {
        recordedContainer.classList.remove('uploading');
        recordedContainer.classList.add('uploaded');

        loader.src = '../gifos/images/check.svg';
        loader.alt = 'GIF Subido ícono';

        uploadInfo.innerText = 'GIFO subido con éxito';

        const gifLink = `https://giphy.com/gifs/${id}`;
        myGIFLink.href = gifLink;

        prepareDownload(blob, id);

        hideComponents(uploadBtn);
      })
      .catch((err) => {
        recordedContainer.classList.remove('uploading');
        recordedContainer.classList.add('error');

        hideComponents(loader);

        uploadInfo.innerText = `${err} Por favor, intenta de nuevo más tarde.`;

        hideComponents(uploadBtn);
      });
  }
});
