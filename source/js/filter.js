import {disableElement, activateElement} from './util.js';

const filter = document.querySelector('.map__filters');
const typeFilter = filter.querySelector('#housing-type');
const priceFilter = filter.querySelector('#housing-price');
const roomsFilter = filter.querySelector('#housing-rooms');
const guestsFilter = filter.querySelector('#housing-guests');
const featuresFilter = filter.querySelector('#housing-features');

const DEFAULT_FILTER_VALUE = 'any';
const DISABLED_FILTER = 'map__filters--disabled';

const NumberForPrice = {
  LOW_PRICE: 10000,
  HIGH_PRICE: 50000,
};

//* Фильтр в активном состоянии

const activateFilter = () => {
  filter.classList.remove(DISABLED_FILTER);
  filter.childNodes.forEach(activateElement);
}

//* Фильтр в неактивном соостоянии

const disableFilter = () => {
  filter.classList.add(DISABLED_FILTER);
  filter.childNodes.forEach(disableElement);
};

disableFilter();

//* Фильтрация по цене

const getFilterByPrice = (data) => {
  switch (priceFilter.value) {
    case 'low':
      return data.offer.price < NumberForPrice.LOW_PRICE;
    case 'middle':
      return data.offer.price >= NumberForPrice.LOW_PRICE && data.offer.price <= NumberForPrice.HIGH_PRICE;
    case 'high':
      return data.offer.price > NumberForPrice.HIGH_PRICE;
    case 'any':
      return true;
  }
};

//* Реализация по типу

const getFilterByFeatures = (data) => {
  const checkedFeatures = featuresFilter.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const filterAnnouncements = (data) => {
  const filterByType = typeFilter.value === DEFAULT_FILTER_VALUE || typeFilter.value === data.offer.type;
  const filterByRooms = roomsFilter.value === DEFAULT_FILTER_VALUE || +roomsFilter.value === data.offer.rooms;
  const filterByGuests = guestsFilter.value === DEFAULT_FILTER_VALUE || +guestsFilter.value === data.offer.guests;
  const filterByPrice = getFilterByPrice(data);
  const filterByFeatures = getFilterByFeatures(data);

  return filterByType && filterByRooms && filterByGuests && filterByPrice && filterByFeatures;
};

const setFilterChange = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

const setFilterReset = (cb) => {
  filter.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};

export {filter, disableFilter, activateFilter, setFilterChange, setFilterReset, filterAnnouncements};
