'use strict';

(() => {
  const pinsList = document.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters-container`);

  const createPinsFragment = (pinsData, numberOfPins) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfPins; i += 1) {
      const pin = window.pin.createPin(pinsData[i]);

      fragment.appendChild(pin);
    }
    return fragment;
  };

  const pinsFragment = createPinsFragment(window.pin.pins, window.pin.NUMBER_OF_PINS);

  pinsList.appendChild(pinsFragment);

  window.data.map.insertBefore(window.card.card, mapFilters);
})();
