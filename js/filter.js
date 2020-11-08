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
        const pin = pins[i];
        const meetHousingTypeCondition = (housingType) => housingType.value === `any` || pin.offer.type === housingType.value;
        const meetPriceCondition = (price) => {
          switch (price.value) {
            case `any`:
              return true;
            case `low`:
              return pin.offer.price <= PRICE_FILTER_LOW;
            case `middle`:
              return pin.offer.price > PRICE_FILTER_LOW && pin.offer.price <= PRICE_FILTER_MIDDLE;
            case `high`:
              return pin.offer.price >= PRICE_FILTER_MIDDLE;
            default:
              return false;
          }
        };
        const meetRoomsNumberCondition = (roomsNumber) => roomsNumber.value === `any` || pin.offer.rooms === Number(roomsNumber.value);
        const meetGuestsNumberCondition = (guestsNumber) => guestsNumber.value === `any` || pin.offer.guests === Number(guestsNumber.value);
        const meetFeaturesCondition = (features) => {
          const checkFeature = (input) => !input.checked || (input.checked && pin.offer.features.includes(input.value));
          return features.every(checkFeature);
        };

        const meetConditions = meetHousingTypeCondition(elements.housingTypeFilter) && meetPriceCondition(elements.priceFilter) && meetRoomsNumberCondition(elements.roomsNumberFilter) && meetGuestsNumberCondition(elements.guestsNumberFilter) && meetFeaturesCondition(featuresInputsArray);

        if (meetConditions) {
          filteredPins.push(pin);
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
