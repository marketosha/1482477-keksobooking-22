import {filter} from './filter.js';
import {sendData} from './api.js';
import {openErrorPopup, openSuccessPopup} from './popup.js';
import {resetMarkerAndAddress} from './map.js';

/* Ограничения для полей формы объявления*/

const FieldLimit = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100,
  MAX_PRICE: 1000000,
};

/* Параметры жилья */

const housingData = {
  palace: {
    type: 'Дворец',
    price: 10000,
  },

  house: {
    type: 'Дом',
    price: 5000,
  },

  flat: {
    type: 'Квартира',
    price: 1000,
  },

  bungalow: {
    type: 'Бунгало',
    price: 0,
  },
};

/*Кол-во комнат и гостей*/

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

/* Формы объявления и ее поля */

const advertisement = document.querySelector('.ad-form');
const title = advertisement.querySelector('#title');
const address = advertisement.querySelector('#address');
const type = advertisement.querySelector('#type');
const price = advertisement.querySelector('#price');
const timeIn = advertisement.querySelector('#timein');
const timeOut = advertisement.querySelector('#timeout');
const room = advertisement.querySelector('#room_number');
const capacity = advertisement.querySelector('#capacity');
const fieldsets = advertisement.querySelectorAll('fieldset');
const resetButton = advertisement.querySelector('.ad-form__reset');

/*Форма в неактивном состоянии*/

const disableForm = () => {
  advertisement.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

/*Форма в активном состоянии*/

const activateForm = () => {
  advertisement.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

disableForm();

/*Валидация заголовка объявления*/

title.addEventListener('input', () => {
  const valueLength = title.value.length;

  if (valueLength < FieldLimit.MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${FieldLimit.MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > FieldLimit.MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${valueLength - FieldLimit.MAX_TITLE_LENGTH} симв.`)
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

/*Адрес*/

address.readOnly = true;

//*Валидация цены по максимальному значению

price.addEventListener('input', () => {
  const valueLength = price.value.length;

  if (valueLength > FieldLimit.MAX_PRICE) {
    price.setCustomValidity(`Цена не должна превышать ${FieldLimit.MAX_PRICE}`)
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});

//*  Валидация цены в зависимости от типа жилья

const validatePrice= () => {
  type.addEventListener('click', () => {
    price.placeholder = housingData[type.value].price;
    price.min = housingData[type.value].price;
  });
};

//*  Выбор опции для времени

const validateTime = () => {
  timeIn.addEventListener('click', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('click', () => timeIn.value = timeOut.value);
}

validateTime();
validatePrice();

/*Валидация количества гостей и комнат*/

const getRoomCapacity = () => {
  for (let option of capacity.options) {
    option.disabled = ROOMS_CAPACITY[room.value].includes(option.value) ? false : true;
  }
  capacity.value = ROOMS_CAPACITY[room.value].includes(capacity.value) ? capacity.value : ROOMS_CAPACITY[room.value][0];
};

getRoomCapacity();

room.addEventListener('change', () => {
  getRoomCapacity();
});

/*Отключение перехода на новую страницу при отправки формы*/

const resetForm = (successBanner) => {
  advertisement.reset();
  filter.reset();
  resetMarkerAndAddress();

  if (successBanner) {
    openSuccessPopup();
  }
};

const setUserFormSubmit = (onSuccess) => {
  advertisement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(true),
      () => openErrorPopup(),
      new FormData(evt.target),
    );
  });
}

setUserFormSubmit(resetForm);
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm(false)
});

export {activateForm, address};
