/* global _:readonly */

import './util.js';
import './data.js';
import './card.js';
import './form.js';
import './map.js';
import './filter.js';
import './popup.js';
import {getData} from './api.js';
import {renderOnMap} from './map.js';
import {setFilterReset, setFilterChange} from './filter.js';

const RERENDER_DELAY = 500;

getData((createAnnouncements) => {
  renderOnMap(createAnnouncements);
  setFilterReset(() => renderOnMap(createAnnouncements));
  setFilterChange(_.debounce(() => renderOnMap(createAnnouncements), RERENDER_DELAY));
});
