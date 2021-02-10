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

export {generateRandomInt, getRandomFloat, getRandomArrayElement, getUniqueArray};
