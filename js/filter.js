'use strict';

(() => {
  const PRICE_FILTER_LOW = 10000;
  const PRICE_FILTER_MIDDLE = 50000;

  const MAX_NUMBER_OF_PINS = 5;

  const getFilterHandlers = (elements) => {
    // let filteredPins = pins;

    const filterPins = (pins) => {
      const filteredPins = [];
      for (let i = 0; i < pins.length; i += 1) {
        if (((elements.housingTypeFilter.value === `any`) || (pins[i].offer.type === elements.housingTypeFilter.value)) &&
        ((elements.priceFilter.value === `any`) || ((elements.priceFilter.value === `low`) && (pins[i].offer.price <= PRICE_FILTER_LOW)) || ((elements.priceFilter.value === `middle`) && (pins[i].offer.price > PRICE_FILTER_LOW) && (pins[i].offer.price <= PRICE_FILTER_MIDDLE) || ((elements.priceFilter.value === `high`) && (pins[i].offer.price >= PRICE_FILTER_MIDDLE)))) && ((elements.roomsNumberFilter.value === `any`) || (pins[i].offer.rooms === Number(elements.roomsNumberFilter.value))) && ((elements.guestsNumberFilter.value === `any`) || (pins[i].offer.guests === Number(elements.guestsNumberFilter.value)))) {
          for (let j = 0; j < elements.featuresInputs.length; j += 1) {
            if ((elements.featuresInputs[j].checked && pins[i].offer.features.includes(elements.featuresInputs[j].value)) || (!elements.featuresInputs[j].checked && !pins[i].offer.features.includes(elements.featuresInputs[j].value))) {
              filteredPins.push(pins[i]);
              break;
            }
          }
          if (filteredPins.length === MAX_NUMBER_OF_PINS) {
            break;
          }
        }
      }
      return filteredPins;
    };

    // const filterByHousingType = () => {
    //   if (elements.housingTypeFilter.value === `any`) {
    //     return;
    //   } else {
    //     filteredPins = filteredPins.filter((pin) => pin.offer.type === elements.housingTypeFilter.value);
    //   }
    // };

    // const filterByPrice = () => {
    //   if (elements.priceFilter.value === `any`) {
    //     return;
    //   } else {
    //     if (elements.priceFilter.value === `low`) {
    //       filteredPins = filteredPins.filter((pin) => pin.offer.price <= PRICE_FILTER_LOW);
    //     } else if (elements.priceFilter.value === `middle`) {
    //       filteredPins = filteredPins.filter((pin) => (pin.offer.price > PRICE_FILTER_LOW) && (pin.offer.price <= PRICE_FILTER_MIDDLE));
    //     } else {
    //       filteredPins = filteredPins.filter((pin) => pin.offer.price >= PRICE_FILTER_MIDDLE);
    //     }
    //   }
    // };

    // const filterByRoomsNumber = () => {
    //   if (elements.roomsNumberFilter.value === `any`) {
    //     return;
    //   } else {
    //     filteredPins = filteredPins.filter((pin) => pin.offer.rooms === Number(elements.roomsNumberFilter.value));
    //   }
    // };

    // const filterByGuestsNumber = () => {
    //   if (elements.guestsNumberFilter.value === `any`) {
    //     return;
    //   } else {
    //     filteredPins = filteredPins.filter((pin) => pin.offer.guests === Number(elements.guestsNumberFilter.value));
    //   }
    // };

    // const filterByFeatures = () => {
    //   elements.featuresInputs.forEach((value) => {
    //     if (value.checked) {
    //       filteredPins = filteredPins.filter((pin) => pin.offer.features.includes(value.value));
    //     }
    //   });
    // };

    // filterByHousingType();
    // filterByPrice();
    // filterByRoomsNumber();
    // filterByGuestsNumber();
    // filterByFeatures();
    // return filteredPins;
    return filterPins;
  };

  window.filter = {getFilterHandlers};
})();
