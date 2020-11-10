"use strict";

const getValidityCheckHandlers = (elements) => {
  const guestsMismatch = `Выбранное количество гостей не подходит под количество комнат`;
  const validateGuestsNumber = () => {
    if (elements.roomsInput.value === `1` && elements.guestsInput.value !== `1`) {
      elements.guestsInput.setCustomValidity(guestsMismatch);
      elements.guestsInput.reportValidity();
    } else if (elements.roomsInput.value === `2` && (elements.guestsInput.value === `3` || elements.guestsInput.value === `0`)) {
      elements.guestsInput.setCustomValidity(guestsMismatch);
      elements.guestsInput.reportValidity();
    } else if (elements.roomsInput.value === `3` && elements.guestsInput.value === `0`) {
      elements.guestsInput.setCustomValidity(guestsMismatch);
      elements.guestsInput.reportValidity();
    } else if (elements.roomsInput.value === `100` && elements.guestsInput.value !== `0`) {
      elements.guestsInput.setCustomValidity(guestsMismatch);
      elements.guestsInput.reportValidity();
    } else {
      elements.guestsInput.setCustomValidity(``);
      elements.guestsInput.reportValidity();
    }
  };

  const setTitleConstraints = () => {
    elements.titleInput.required = true;
    elements.titleInput.setAttribute(`minlength`, 30);
    elements.titleInput.setAttribute(`maxlength`, 100);
  };

  const setHousingTypeConstraints = () => {
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

  const setPriceConstraints = () => {
    elements.priceInput.required = true;
    elements.priceInput.setAttribute(`max`, 1000000);
  };

  const setCheckInConstraints = () => {
    elements.checkOutInput.value = elements.checkInInput.value;
  };

  const setCheckOutConstraints = () => {
    elements.checkInInput.value = elements.checkOutInput.value;
  };

  const setImageConstraints = (input) => {
    input.setAttribute(`accept`, `image/*`);
  };

  return {validateGuestsNumber, setTitleConstraints, setHousingTypeConstraints, setPriceConstraints, setCheckInConstraints, setCheckOutConstraints, setImageConstraints};
};

window.form = {getValidityCheckHandlers};
