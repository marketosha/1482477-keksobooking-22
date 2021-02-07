'use strict';

/* Переменные */

const TITLES = [
  'Рауталахти Вилладж',
  'Парк-Отель Хутор Ярви',
  'Piter Inn',
  'Prospekt',
];
const TYPES = ['palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Апартаменты «Проспект» с бесплатным Wi-Fi расположены в Петрозаводске, в Карелии.',
  'В парк-отеле «Хутор Ярви» к услугам гостей отдельный пляж и бесплатный Wi-Fi.',
  'Piter Inn расположен в центре Петрозаводска, всего в 2 минутах ходьбы от центрального железнодорожного вокзала.',
  'Дом для отпуска «Рауталахти Вилладж» с собственной бесплатной парковкой расположен в деревне Рауталахти Республики Карелия.',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const ImageNumber = {
  MIN: 1,
  MAX: 8,
};

const CoordinateX = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const CoordinateY = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const DECIMAL_FOR_LOCATION = 5;

const NumberForOffer = {
  MIN: 0,
  MAX: 100,
};

const PriceNumber = {
  MIN: 0,
  MAX: 1000000,
};

/*Генерация чисел*/

const generateRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result >= min ? result : generateRandomInt(min, max);
  }

  throw new Error ('Ошибка входных данных');
};

/*Генерация чисел с плавающей точкой*/

const getRandomFloat = (min, max, decimal = 2) => {
  if (max > min && min >= 0) {
    const result = (Math.random() * max).toFixed(decimal);
    return result >= min ? result : getRandomFloat(min, max, decimal);
  }

  throw new Error ('Ошибка входных данных');
};

/*Генерация элемента массива*/

const getRandomArrayElement = function (elements) {
  return elements[generateRandomInt(0, elements.length - 1)];
};

/*Генерация случайной длины массива*/

const getUniqueArray = elements => {
  const uniqueArray = [];
  for (let i = 0; i <= generateRandomInt(0, elements.length - 1); i++) {
    const uniqueIndex = generateRandomInt(0, elements.length - 1);
    if (uniqueArray.indexOf(elements[uniqueIndex]) === -1) {
      uniqueArray.push(elements[uniqueIndex]);
    }
  }
  return uniqueArray;
};

/*Описание функций для массива*/

const getAuthor = () => ({
  avatar: `img/avatars/user0${generateRandomInt(ImageNumber.MIN, ImageNumber.MAX)}.png`,
});

const getLocation = () => ({
  x: getRandomFloat(CoordinateX.MIN, CoordinateX.MAX,  DECIMAL_FOR_LOCATION),
  y: getRandomFloat(CoordinateY.MIN, CoordinateY.MAX,  DECIMAL_FOR_LOCATION),
});

const generateOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: Object.values(getLocation()),
  price: generateRandomInt(PriceNumber.MIN, PriceNumber.MAX),
  type: getRandomArrayElement(TYPES),
  rooms: generateRandomInt(NumberForOffer.MIN, NumberForOffer.MAX),
  guests: generateRandomInt(NumberForOffer.MIN, NumberForOffer.MAX),
  checkin: getRandomArrayElement(CHECKIN_HOURS),
  checkout: getRandomArrayElement(CHECKOUT_HOURS),
  features: getUniqueArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getUniqueArray(PHOTOS),
});

const getTotalObject = () => ({
  author: getAuthor(),
  offer: generateOffer(),
  location: getLocation(),
});

const createAnnouncements = new Array(10).fill(null).map(getTotalObject);

createAnnouncements;
