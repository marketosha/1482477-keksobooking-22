const main = document.querySelector('main');
const errorCard = document.querySelector('#error').content;
const newErrorCard = errorCard.querySelector('.error').cloneNode(true);
const closeErrorPopupButton = newErrorCard.querySelector('.error__button');

const successCard = document.querySelector('#success').content;
const newSuccessCard = successCard.querySelector('.success').cloneNode(true);

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

export {openErrorPopup, openSuccessPopup};
