'use strict';

(() => {
  const getValidityCheckHandlers = (elements) => {
    const checkGuestNumberValidity = () => {
      if (elements.roomsInput.value === `1` && elements.guestsInput.value !== `1`) {
        elements.guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
        elements.guestsInput.reportValidity();
      } else if (elements.roomsInput.value === `2` && (elements.guestsInput.value === `3` || elements.guestsInput.value === `0`)) {
        elements.guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
        elements.guestsInput.reportValidity();
      } else if (elements.roomsInput.value === `3` && elements.guestsInput.value === `0`) {
        elements.guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
        elements.guestsInput.reportValidity();
      } else if (elements.roomsInput.value === `100` && elements.guestsInput.value !== `0`) {
        elements.guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
        elements.guestsInput.reportValidity();
      } else {
        elements.guestsInput.setCustomValidity(``);
        elements.guestsInput.reportValidity();
      }
    };

    const validateTitle = () => {
      elements.titleInput.required = true;
      elements.titleInput.setAttribute(`minlength`, 30);
      elements.titleInput.setAttribute(`maxlength`, 100);
    };

    const validateHousingType = () => {
      switch (elements.housingTypeInput.value) {
        case `bungalow`:
          elements.priceInput.setAttribute(`min`, 0);
          elements.priceInput.setAttribute(`placeholder`, 0);
          break;
        case `flat`:
          elements.priceInput.setAttribute(`min`, 1000);
          elements.priceInput.setAttribute(`placeholder`, 1000);
          break;
        case `house`:
          elements.priceInput.setAttribute(`min`, 5000);
          elements.priceInput.setAttribute(`placeholder`, 5000);
          break;
        case `palace`:
          elements.priceInput.setAttribute(`min`, 10000);
          elements.priceInput.setAttribute(`placeholder`, 10000);
      }
    };

    const validatePrice = () => {
      elements.priceInput.required = true;
      elements.priceInput.setAttribute(`max`, 1000000);
    };

    const validateCheckIn = () => {
      elements.checkOutInput.value = elements.checkInInput.value;
    };

    const validateCheckOut = () => {
      elements.checkInInput.value = elements.checkOutInput.value;
    };

    const validateImage = (input) => {
      input.setAttribute(`accept`, `image/*`);
    };

    return {checkGuestNumberValidity, validateTitle, validateHousingType, validatePrice, validateCheckIn, validateCheckOut, validateImage};
  };

  window.form = {getValidityCheckHandlers};
})();
