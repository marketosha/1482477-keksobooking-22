//* Определение склонения существительного по числу

const getDeclensionOfNoun = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles [(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

//* Проверка наличия значения для отображения или скрытия соответствующего атрибута с изображением на карточке объявления

const checkAttributeSrc = (cardAttribute, value) => {
  if (value) {
    cardAttribute.src = value;
  } else {
    cardAttribute.remove;
  }
};

//* Проверка наличия значения для отображения или скрытия соответствующего атрибута с текстом на карточке объявления

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

export {getDeclensionOfNoun, checkAttributeSrc, checkAttributeTextContent};
