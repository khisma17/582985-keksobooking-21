'use strict';

(() => {
  const PRICE_FILTER_LOW = 10000;
  const PRICE_FILTER_MIDDLE = 50000;

  const getFilterHandlers = (elements, pins) => {
    let filteredPins = pins;

    const filterByHousingType = () => {
      if (elements.housingTypeFilter.value === `any`) {
        return;
      } else {
        filteredPins = filteredPins.filter((pin) => pin.offer.type === elements.housingTypeFilter.value);
      }
    };

    const filterByPrice = () => {
      if (elements.priceFilter.value === `any`) {
        return;
      } else {
        if (elements.priceFilter.value === `low`) {
          filteredPins = filteredPins.filter((pin) => pin.offer.price <= PRICE_FILTER_LOW);
        } else if (elements.priceFilter.value === `middle`) {
          filteredPins = filteredPins.filter((pin) => (pin.offer.price > PRICE_FILTER_LOW) && (pin.offer.price <= PRICE_FILTER_MIDDLE));
        } else {
          filteredPins = filteredPins.filter((pin) => pin.offer.price >= PRICE_FILTER_MIDDLE);
        }
      }
    };

    const filterByRoomsNumber = () => {
      if (elements.roomsNumberFilter.value === `any`) {
        return;
      } else {
        filteredPins = filteredPins.filter((pin) => pin.offer.rooms === Number(elements.roomsNumberFilter.value));
      }
    };

    const filterByGuestsNumber = () => {
      if (elements.guestsNumberFilter.value === `any`) {
        return;
      } else {
        filteredPins = filteredPins.filter((pin) => pin.offer.guests === Number(elements.guestsNumberFilter.value));
      }
    };

    const filterByFeatures = () => {
      elements.featuresInputs.forEach((value) => {
        if (value.checked) {
          filteredPins = filteredPins.filter((pin) => pin.offer.features.includes(value.value));
        }
      });
    };

    filterByHousingType();
    filterByPrice();
    filterByRoomsNumber();
    filterByGuestsNumber();
    filterByFeatures();
    return filteredPins;
  };

  window.filter = {getFilterHandlers};
})();
