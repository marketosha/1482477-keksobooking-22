'use strict';

/* Переменные */

const TITLE = ['Рауталахти Вилладж', 'Парк-Отель Хутор Ярви', 'Piter Inn', 'Prospekt'];
const TYPE = ['palace', 'flat', 'house', 'bungalow'];
const CHECKIN_HOUR = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOUR = ['12:00', '13:00', '14:00'];
const FEAUTERS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['Апартаменты «Проспект» с бесплатным Wi-Fi расположены в Петрозаводске, в Карелии.', 'В парк-отеле «Хутор Ярви» к услугам гостей отдельный пляж и бесплатный Wi-Fi.', 'Piter Inn расположен в центре Петрозаводска, всего в 2 минутах ходьбы от центрального железнодорожного вокзала.', 'Дом для отпуска «Рауталахти Вилладж» с собственной бесплатной парковкой расположен в деревне Рауталахти Республики Карелия.']
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const ANNOUNCEMENT_QUANTITY = 10;

/*Генерация чисел*/

const generateRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    const result = Math.floor (Math.random () * (max - min + 1) + min);
    return result >= min ? result : generateRandomInt (min, max);
  }

  throw new Error ('Ошибка входных данных');
};

/*Генерация чисел с плавающей точкой*/

const getRandomFloat = (min, max, decimal = 2) => {
  if (max > min && min >= 0) {
    const result = (Math.random () * max).toFixed (decimal);
    return result >= min ? result : getRandomFloat (min, max, decimal);
  }

  throw new Error ('Ошибка входных данных');
};

/*Генерация элемента массива*/

let getRandomArrayElement = function (elements) {
  return elements[generateRandomInt (0, elements.length - 1)];
};

/*Генерация случайной длины массива*/

const getUniqueArray = (elements) => {
  let uniqueArray = [];
  for (let i=0; i <= generateRandomInt(0, elements.length-1); i++){
    let uniqueIndex = generateRandomInt(0, elements.length-1);
    if (uniqueArray.indexOf(elements[uniqueIndex]) == -1){
      uniqueArray.push(elements[uniqueIndex]);
    }
  }
  return uniqueArray;
};

/*Описание функций для массива*/

const getAuthor = () => {
  return  {avatar: 'img/avatars/user' + 0 + generateRandomInt(1, 8) + '.png'};
};

const getLocation = () => {
  return {
    x: getRandomFloat(35.65000, 35.70000, 5),
    y: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const getOffer = () => {
  return {
    title: getRandomArrayElement (TITLE),
    address:  Object.values(getLocation()),
    price: generateRandomInt(0, 1000000),
    type: getRandomArrayElement (TYPE),
    rooms: generateRandomInt(0, 100),
    guests: generateRandomInt(0, 100),
    checkin: getRandomArrayElement (CHECKIN_HOUR),
    checkout: getRandomArrayElement (CHECKOUT_HOUR),
    features: getUniqueArray (FEAUTERS),
    description: getRandomArrayElement (DESCRIPTION),
    photos: getUniqueArray (PHOTOS),
  };
};

const getTotalObject = () => {
  return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  };
};

const createSeveralAnnouncements = () => {
  return new Array(ANNOUNCEMENT_QUANTITY).fill(null).map(getTotalObject);
};

createSeveralAnnouncements();
