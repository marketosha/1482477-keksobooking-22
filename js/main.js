import './util.js';
import './data.js';
import './card.js';
import './form.js';
import './map.js';
import './filter.js';
import './popup.js';
import {getData} from './api.js';
import {renderCards} from './card.js';

getData((createAnnouncements) => {
  renderCards(createAnnouncements);
});
