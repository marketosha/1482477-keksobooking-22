const filter = document.querySelector('.map__filters');
const selectsFilter = filter .querySelectorAll('select');
const featuresFilter = filter .querySelector('#housing-features');

/*Фильтр в неактивном состоянии*/

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  selectsFilter.forEach((select) => {
    select.disabled = true;
  });
  featuresFilter.disabled = true;
};

disableFilter();

/*Форма в активном состоянии*/

const activeFilter = () => {
  filter.classList.remove('map__filters--disabled');
  selectsFilter.forEach((select) => {
    select.disabled = false;
  });
  featuresFilter.disabled = false;
};

export {activeFilter};
