'use strict';

(() => {
  const NUMBER_OF_PINS = 8;
  const currentPin = 0;

  const initiateRendering = (pinTemplate, pinsDestinationList, cardTemplate, mapElement, beforeElement) => {
    const renderElements = (pins) => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i <= NUMBER_OF_PINS; i += 1) {
        fragment.appendChild(window.pin.createPin(pinTemplate, pins[i]));
      }
      pinsDestinationList.appendChild(fragment);

      const card = window.card.createCard(cardTemplate, pins[currentPin]);

      mapElement.insertBefore(card, beforeElement);
    };

    return renderElements;
  };

  window.map = {initiateRendering};
})();
