'use strict';

(() => {
  const guestsInput = document.querySelector(`#capacity`);
  const roomsInput = document.querySelector(`#room_number`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);
  const housingTypeFilter = document.querySelector(`#housing-type`);

  const mainPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const filters = document.querySelector(`.map__filters`);
  const filtersFieldsets = filters.querySelectorAll(`select, input`);
  const addressInput = document.querySelector(`#address`);
  const titleInput = document.querySelector(`#title`);
  const housingTypeInput = document.querySelector(`#type`);
  const priceInput = document.querySelector(`#price`);
  const checkInInput = document.querySelector(`#timein`);
  const checkOutInput = document.querySelector(`#timeout`);
  const avatarInput = document.querySelector(`#avatar`);
  const imageInput = document.querySelector(`#images`);

  const elements = {mainPin, map, form, formFieldsets, filtersFieldsets, addressInput, pinTemplate, pinsList, cardTemplate, mapFilters, guestsInput, roomsInput, titleInput, housingTypeInput, priceInput, checkInInput, checkOutInput};

  const loadURL = `https://21.javascript.pages.academy/keksobooking/data`;

  let pins = [];

  const handleSuccess = (data) => {
    pins = data;
    updatePins();
    window.activation.activateFilters(elements);
  };

  const clearPins = () => {
    const pinElements = pinsList.querySelectorAll(`.map__pin`);
    for (let i = 1; i < pinElements.length; i += 1) {
      pinElements[i].remove();
    }
  };

  const clearCards = () => {
    const cards = document.querySelectorAll(`.map .map__card`);
    cards.forEach((element) => {
      element.remove();
    });
  };

  const functions = {clearCards};

  const renderPins = window.map.getRenderingHandlers(elements, functions).renderPins;

  const updatePins = () => {
    clearPins();
    if (housingTypeFilter.value === `any`) {
      renderPins(pins);
      return;
    } else {
      const sameHousingTypePins = pins.filter((pin) => {
        return pin.offer.type === housingTypeFilter.value;
      });
      renderPins(sameHousingTypePins);
    }
  };

  const handleError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const pinFeatures = {
    pinWidth: pageActivation.pinWidth,
    pinHeight: pageActivation.pinHeightActive
  };

  const onMainPinClick = window.pinMovement.getPinMovementHandlers(elements, pinFeatures).onMainPinClick;

  mainPin.addEventListener(`mousedown`, onMainPinClick);
  
  const checkGuestNumberValidity = window.form.getValidityCheckHandlers(elements).checkGuestNumberValidity;
  const validateTitle = window.form.getValidityCheckHandlers(elements).validateTitle;
  const validateHousingType = window.form.getValidityCheckHandlers(elements).validateHousingType;
  const validatePrice = window.form.getValidityCheckHandlers(elements).validatePrice;
  const validateCheckIn = window.form.getValidityCheckHandlers(elements).validateCheckIn;
  const validateCheckOut = window.form.getValidityCheckHandlers(elements).validateCheckOut;
  const validateImage = window.form.getValidityCheckHandlers(elements).validateImage;

  document.addEventListener(`DOMContentLoaded`, () => {
    checkGuestNumberValidity();
  });

  housingTypeFilter.addEventListener(`input`, () => {
    updatePins();
  });

  guestsInput.addEventListener(`input`, () => {
    checkGuestNumberValidity();
  });

  roomsInput.addEventListener(`input`, () => {
    checkGuestNumberValidity();
  });

  housingTypeInput.addEventListener(`input`, () => {
    validateHousingType();
  });

  checkInInput.addEventListener(`input`, () => {
    validateCheckIn();
  });

  checkOutInput.addEventListener(`input`, () => {
    validateCheckOut();
  });

  validateTitle();
  validatePrice();
  validateImage(avatarInput);
  validateImage(imageInput);

  const pageActivation = window.activation.getPageActivationHandlers(elements, loadURL, handleSuccess, handleError);

  pageActivation.setInactivePageMode();

  window.main = {pageActivation};
})();
