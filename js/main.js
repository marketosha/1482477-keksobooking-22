import './util.js';
import './data.js';
import './card.js';
import './form.js';
import './map.js';
import './filter.js';
import {getData} from './api.js';
import {renderCard} from './card.js';

getData((createAnnouncements) => {
  renderCard(createAnnouncements);
});
