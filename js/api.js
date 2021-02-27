import {openErrorDataPopup} from './util.js';

const receiptServer = 'https://22.javascript.pages.academy/keksobooking/data';
const departureServer = 'https://22.javascript.pages.academy/keksobooking';

function getData () {
  return fetch(receiptServer)
    .then(
      (response) => response.json())
    .catch(openErrorDataPopup)
}

const sendData = (onSuccess, onFail, body) => {
  fetch(departureServer,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData};
