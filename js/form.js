"use strict";

const PriceConstraints = {
  MINIMUM: 0,
  FLAT_MINIMUM: 1000,
  HOUSE_MINIMUM: 5000,
  PALACE_MINIMUM: 10000,
  MAXIMUM: 1000000
};

const TitleLengthConstraints = {
  MINIMUM: 30,
  MAXIMUM: 100
};

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
    elements.titleInput.setAttribute(`minlength`, String(TitleLengthConstraints.MINIMUM));
    elements.titleInput.setAttribute(`maxlength`, String(TitleLengthConstraints.MAXIMUM));
  };

  const setHousingTypeConstraints = () => {
    switch (elements.housingTypeInput.value) {
      case `bungalow`:
        elements.priceInput.setAttribute(`min`, String(PriceConstraints.MINIMUM));
        elements.priceInput.setAttribute(`placeholder`, String(PriceConstraints.MINIMUM));
        break;
      case `flat`:
        elements.priceInput.setAttribute(`min`, String(PriceConstraints.FLAT_MINIMUM));
        elements.priceInput.setAttribute(`placeholder`, String(PriceConstraints.FLAT_MINIMUM));
        break;
      case `house`:
        elements.priceInput.setAttribute(`min`, String(PriceConstraints.HOUSE_MINIMUM));
        elements.priceInput.setAttribute(`placeholder`, String(PriceConstraints.HOUSE_MINIMUM));
        break;
      case `palace`:
        elements.priceInput.setAttribute(`min`, String(PriceConstraints.PALACE_MINIMUM));
        elements.priceInput.setAttribute(`placeholder`, String(PriceConstraints.PALACE_MINIMUM));
    }
  };

  const setPriceConstraints = () => {
    elements.priceInput.required = true;
    elements.priceInput.setAttribute(`max`, String(PriceConstraints.MAXIMUM));
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
