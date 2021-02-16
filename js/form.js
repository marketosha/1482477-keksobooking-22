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

/* Формы объявления и ее поля */

const advertisement = document.querySelector('.ad-form');
const type = advertisement.querySelector('#type');
const price = advertisement.querySelector('#price');
const timeIn = advertisement.querySelector('#timein');
const timeOut = advertisement.querySelector('#timeout');

//*  Выбор опции для времени

const validateTime = () => {
  timeIn.addEventListener('click', () => timeOut.value = timeIn.value);
  timeOut.addEventListener('click', () => timeIn.value = timeOut.value);
}

//*  Валидация цены в зависимости от типа жилья

const validatePrice= () => {
  type.addEventListener('click', () => {
    price.placeholder = housingData[type.value].price;
    price.min = housingData[type.value].price;
  });
};

validateTime();
validatePrice();
