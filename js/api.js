import {openErrorDataPopup} from './util.js';

const RECEIPT_SERVER = 'https://22.javascript.pages.academy/keksobooking/data';
const DEPARTURE_SERVER = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  return fetch(RECEIPT_SERVER)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(openErrorDataPopup)
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DEPARTURE_SERVER,
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
