'use strict';

(() => {
  const PRICE_FILTER_LOW = 10000;
  const PRICE_FILTER_MIDDLE = 50000;

  const MAX_NUMBER_OF_PINS = 5;

  const getFilterHandlers = (elements) => {
    const featuresInputsArray = Array.from(elements.featuresInputs);

    const filterPins = (pins) => {
      const filteredPins = [];

      for (let i = 0; i < pins.length; i += 1) {
        const housingTypeFilterConditions = elements.housingTypeFilter.value === `any` || pins[i].offer.type === elements.housingTypeFilter.value;
        const priceFilterConditions = elements.priceFilter.value === `any` || (elements.priceFilter.value === `low` && pins[i].offer.price <= PRICE_FILTER_LOW) || (elements.priceFilter.value === `middle` && pins[i].offer.price > PRICE_FILTER_LOW && pins[i].offer.price <= PRICE_FILTER_MIDDLE) || (elements.priceFilter.value === `high` && pins[i].offer.price >= PRICE_FILTER_MIDDLE);
        const roomsNumberConditions = elements.roomsNumberFilter.value === `any` || pins[i].offer.rooms === Number(elements.roomsNumberFilter.value);
        const guestsNumberConditions = elements.guestsNumberFilter.value === `any` || pins[i].offer.guests === Number(elements.guestsNumberFilter.value);
        const isChecked = (input) => !input.checked || (input.checked && pins[i].offer.features.includes(input.value));
        const featuresConditions = featuresInputsArray.every(isChecked);

        const filterConditions = [housingTypeFilterConditions, priceFilterConditions, roomsNumberConditions, guestsNumberConditions, featuresConditions];

        if (filterConditions.indexOf(false) === -1) {
          filteredPins.push(pins[i]);
        }
        if (filteredPins.length === MAX_NUMBER_OF_PINS) {
          break;
        }
      }
      return filteredPins;
    };

    return filterPins;
  };

  window.filter = {getFilterHandlers};
})();
