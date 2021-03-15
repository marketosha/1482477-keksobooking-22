import {renderOnMap} from './map.js';
import {getDeclensionOfNoun,  checkAttributeSrc, checkAttributeTextContent} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};


const renderCard = ({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  checkAttributeSrc(cardElement.querySelector('.popup__avatar'), author.avatar);
  checkAttributeTextContent(cardElement.querySelector('.popup__title'), offer.title);
  checkAttributeTextContent(cardElement.querySelector('.popup__text--address'), offer.address);
  checkAttributeTextContent(cardElement.querySelector('.popup__text--price'), offer.price, '₽/ночь');
  checkAttributeTextContent(cardElement.querySelector('.popup__type'),  typeDictionary[offer.type]);

  const popupCapacity = cardElement.querySelector('.popup__text--capacity');

  if(offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${getDeclensionOfNoun(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${getDeclensionOfNoun(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = cardElement.querySelector('.popup__text--time');

  if(offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  const possibleFeaturesList = cardElement.querySelector('.popup__features');
  const featuresList = offer.features;

  if(featuresList.length) {
    possibleFeaturesList.innerHTML = '';
    featuresList.forEach((feature) => {
      possibleFeaturesList.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    });
  } else {
    possibleFeaturesList.remove();
  }

  checkAttributeTextContent(cardElement.querySelector('.popup__description'), offer.description);

  const photoGallery = cardElement.querySelector('.popup__photos');
  const photosList = offer.photos;

  if(photosList.length) {
    photoGallery.innerText = '';
    photosList.forEach((photo) => {
      photoGallery.insertAdjacentHTML('beforeend',`<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`);
    });
  } else {
    photoGallery.remove();
  }

  return cardElement;
};

const clearRenderCard = () => {
  cardTemplate.innerHTML = '';
};

//* Функция, чтобы подружить карту с объявлениями

const renderCards = (similarAnnouncements) => {
  similarAnnouncements.forEach(({author, offer, location}) => {
    const cardElement = renderCard(author, offer);
    renderOnMap(location, cardElement);
  });
};

export {renderCard, clearRenderCard, renderCards};
