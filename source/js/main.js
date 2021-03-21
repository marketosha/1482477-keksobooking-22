import _ from 'lodash'
import './util.js';
import './card.js';
import './form.js';
import './map.js';
import './filter.js';
import './popup.js';
import './card-photo.js';
import {getData} from './api.js';
import {renderOnMap} from './map.js';
import {setFilterChange, setFilterReset, activateFilter} from './filter.js';
import {openErrorDataPopup} from './popup.js';

const RERENDER_DELAY = 500;

getData((createAnnouncements) => {
  renderOnMap(createAnnouncements);
  setFilterReset(() => renderOnMap(createAnnouncements));
  setFilterChange(_.debounce(() => renderOnMap(createAnnouncements), RERENDER_DELAY));
  activateFilter();
}, openErrorDataPopup);
