const RECEIPT_SERVER = 'https://22.javascript.pages.academy/keksobooking/data';
const DEPARTURE_SERVER = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  return fetch(RECEIPT_SERVER)
    .then((response) => response.json())
    .catch(() => onFail('Не удалось получить данные с сервера, попробуйте перезагрузить страницу'))
    .then(onSuccess)
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
