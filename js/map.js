import {activateForm, address} from './form.js';
import {createAnnouncements} from './data.js';
import {renderCards} from './card.js';
import {activateFilter} from './filter.js';
import {getData} from './api.js';

/* global L:readonly */

const INITIAL_COORDINATES = {
  lat: '35.68951',
  lng: '139.69201',
};

const ZOOM = 12;

const mainAddress = () => {
  address.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    activateFilter();
    activateForm();
    mainAddress();
  })
  .setView({
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

/*Добавление главного маркера*/

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

/*Сброс маркера и координат*/

const resetMarkerAndAddress = () => {
  address.value = `${INITIAL_COORDINATES.Lat}, ${INITIAL_COORDINATES.Lng}`;
  mainPinMarker.setLatLng([INITIAL_COORDINATES.Lat, INITIAL_COORDINATES.Lng]);
};

/*Добавление вспомогательные метки*/

const ponyPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

getData()
  .then(() => {
    createAnnouncements.forEach((announcement) => {
      const ponyPin = L.marker(
        {
          lat: announcement.location.x,
          lng: announcement.location.y,
        },
        {
          icon: ponyPinIcon,
        },
      );

      ponyPin
        .addTo(map)
        .bindPopup(renderCards(announcement));
    });
  });

export {resetMarkerAndAddress};
