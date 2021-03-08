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

const getRandomArrayElement = (elements) => elements[generateRandomInt(0, elements.length - 1)];

/*Генерация случайной длины массива*/

const getUniqueArray = (elements) => {
  const uniqueArray = [];
  for (let i = 0; i <= generateRandomInt(0, elements.length - 1); i++) {
    const uniqueIndex = generateRandomInt(0, elements.length - 1);
    if (uniqueArray.indexOf(elements[uniqueIndex]) === -1) {
      uniqueArray.push(elements[uniqueIndex]);
    }
  }
  return uniqueArray;
};

const ALERT_SHOW_TIME = 3000;

function openErrorDataPopup () {
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

  setTimeout(() => {
    errorPopup.remove();
  }, ALERT_SHOW_TIME)
}

/*Определение склонения существительного по числу*/

const getDeclensionOfNoun = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

/*Проверка наличия значения для отображения или скрытия соответствующего атрибута с изображением на карточке объявления*/

const checkAttributeSrc = (cardAttribute, value) => {
  if (value) {
    cardAttribute.src = value;
  } else {
    cardAttribute.remove;
  }
};

/* Проверка наличия значения для отображения или скрытия соответствующего атрибута с текстом на карточке объявления*/

const checkAttributeTextContent = (cardAttribute, value, additionalString) => {
  if (value) {
    if (additionalString) {
      cardAttribute.textContent = value + additionalString;
    } else {
      cardAttribute.textContent = value;
    }
  } else {
    cardAttribute.remove();
  }
};

export {generateRandomInt, getRandomFloat, getRandomArrayElement, getUniqueArray, openErrorDataPopup, getDeclensionOfNoun, checkAttributeSrc, checkAttributeTextContent};
