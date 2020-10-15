'use strict';

(() => {
  const createPin = (pinTemplate, pinData) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImage = pinElement.querySelector(`img`);

    pinElement.setAttribute(`style`, `left: ${pinData.location.x + window.activation.PIN_WIDTH / 2}px; top: ${pinData.location.y + window.activation.PIN_HEIGHT}px;`);
    pinElementImage.setAttribute(`src`, `${pinData.author.avatar}`);
    pinElementImage.setAttribute(`alt`, `${pinData.offer.title}`);

    return pinElement;
  };

  window.pin = {createPin};
})();
