'use strict';

(() => {
  const MAX_NUMBER_OF_PINS = 5;

  const currentPin = 0;

  const getRenderingHandlers = (elements) => {
    const renderPins = (pins) => {
      const fragment = document.createDocumentFragment();
      const takeNumber = pins.length > MAX_NUMBER_OF_PINS
        ? MAX_NUMBER_OF_PINS
        : pins.length;

      elements.pinsList.innerHTML = ``;

      for (let i = 0; i < takeNumber; i += 1) {
        fragment.appendChild(window.pin.createPin(elements.pinTemplate, pins[i]));
      }
      elements.pinsList.appendChild(fragment);
    };
    const renderCards = (pins) => {
      const card = window.card.createCard(elements.cardTemplate, pins[currentPin]);

      elements.map.insertBefore(card, elements.mapFilters);

      for (let i = 0; i < elements.filtersFieldsets.length; i += 1) {
        elements.filtersFieldsets[i].addEventListener(`input`, () => {
          card.classList.add(`hidden`);
        });
      }
    };

    return {renderPins, renderCards};
  };

  window.map = {getRenderingHandlers};
})();
