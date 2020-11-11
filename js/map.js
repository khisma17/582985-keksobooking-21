"use strict";

const MAX_NUMBER_OF_PINS = 5;
const MAIN_MOUSE_BUTTON = 0;

const getRenderingHandlers = (elements, functions) => {
  const renderPins = (pins) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < Math.min(pins.length, MAX_NUMBER_OF_PINS); i += 1) {
      const pinElement = window.pin.createPin(elements.pinTemplate, pins[i]);

      const onPinClick = (evt) => {
        if (evt.button === MAIN_MOUSE_BUTTON) {
          functions.clearCards();
          renderCards(pins[i]);
          pinElement.classList.add(`map__pin--active`);
        }
      };

      pinElement.addEventListener(`click`, onPinClick);

      fragment.appendChild(pinElement);
    }
    elements.pinsList.appendChild(fragment);
  };
  const renderCards = (pin) => {
    const card = window.card.createCard(elements.cardTemplate, pin);

    const closeButton = card.querySelector(`.popup__close`);

    const onCardCloseButtonClick = (evt) => {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        card.classList.add(`hidden`);
        document.removeEventListener(`keydown`, onCardEscapePress);
      }
    };

    const onCardEscapePress = (evt) => {
      if (evt.key === `Escape`) {
        card.classList.add(`hidden`);
        document.removeEventListener(`keydown`, onCardEscapePress);
      }
    };

    closeButton.addEventListener(`click`, onCardCloseButtonClick);

    document.addEventListener(`keydown`, onCardEscapePress);

    elements.map.insertBefore(card, elements.mapFilters);

    elements.filtersFieldsets.forEach((element) => {
      element.addEventListener(`input`, () => {
        card.classList.add(`hidden`);
      });
    });
  };

  return {renderPins, renderCards};
};

window.map = {getRenderingHandlers};
