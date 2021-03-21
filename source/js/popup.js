import {disableFilter} from './filter.js';
import {filter} from './filter.js';
import {advertisement, getRoomCapacity} from './form.js';
import {resetImagePreview} from './card-photo.js';
import {resetMarkerAndAddress} from './map.js'
import {sendData} from './api.js';

const main = document.querySelector('main');
const errorCard = document.querySelector('#error').content;
const newErrorCard = errorCard.querySelector('.error').cloneNode(true);
const closeErrorPopupButton = newErrorCard.querySelector('.error__button');

const successCard = document.querySelector('#success').content;
const newSuccessCard = successCard.querySelector('.success').cloneNode(true);

const resetButton = advertisement.querySelector('.ad-form__reset');

const buttonPressedHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup();
  }
}
const openErrorPopup = () => {
  main.appendChild(newErrorCard);
  document.addEventListener('keydown', buttonPressedHandler);
}

const openSuccessPopup = () => {
  main.appendChild(newSuccessCard);
  document.addEventListener('keydown', buttonPressedHandler);
}

const closePopup = () => {
  if (main.contains(newErrorCard)) {
    main.removeChild(newErrorCard);
  }

  if (main.contains(newSuccessCard)) {
    main.removeChild(newSuccessCard);
  }

  document.removeEventListener('keydown',buttonPressedHandler);
}

closeErrorPopupButton.addEventListener('click', () => {
  closePopup();
});

newErrorCard.addEventListener('click', () => {
  closePopup();
});

newSuccessCard.addEventListener('click', () => {
  closePopup();
});

const ALERT_SHOW_TIME = 3000;

const openErrorDataPopup = () => {
  let errorPopup = document.createElement('div');
  errorPopup.style.height = '50px';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.backgroundColor = '#ffaa99';
  errorPopup.style.position = 'fixed';
  errorPopup.style.padding = '10px';
  errorPopup.style.fontSize = '20px';
  errorPopup.style.top = 0;
  errorPopup.style.right = 0;
  errorPopup.style.left = 0;
  errorPopup.textContent = 'Ошибка загрузки данных с сервера';

  document.body.appendChild(errorPopup);

  disableFilter();

  setTimeout(() => {
    errorPopup.remove();
  }, ALERT_SHOW_TIME)
};

const resetForm = (successBanner) => {
  advertisement.reset();
  filter.reset();
  resetMarkerAndAddress();
  getRoomCapacity();
  resetImagePreview();

  if (successBanner) {
    openSuccessPopup();
  }
};

const formSubmitHandler = (onSuccess) => {
  advertisement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(true),
      () => openErrorPopup(),
      new FormData(evt.target),
    );
  });
}

formSubmitHandler(resetForm);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(false)
});

export {openErrorDataPopup};
