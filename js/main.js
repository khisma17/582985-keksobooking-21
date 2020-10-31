'use strict';

(() => {
  const MAIN_MOUSE_BUTTON = 0;

  const guestsInput = document.querySelector(`#capacity`);
  const roomsInput = document.querySelector(`#room_number`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const successfulUploadTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const uploadErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const resetFormButton = document.querySelector(`.ad-form__reset`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);
  const housingTypeFilter = document.querySelector(`#housing-type`);
  const priceFilter = document.querySelector(`#housing-price`);
  const roomsNumberFilter = document.querySelector(`#housing-rooms`);
  const guestsNumberFilter = document.querySelector(`#housing-guests`);
  const featuresFilter = document.querySelector(`#housing-features`);
  const featuresInputs = featuresFilter.querySelectorAll(`input`);

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

  const elements = {mainPin, map, form, formFieldsets, filtersFieldsets, addressInput, pinTemplate, pinsList, cardTemplate, mapFilters, guestsInput, roomsInput, titleInput, housingTypeInput, priceInput, checkInInput, checkOutInput, housingTypeFilter, priceFilter, roomsNumberFilter, guestsNumberFilter, featuresInputs};

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

  const functions = {clearPins, clearCards};

  const {renderPins} = window.map.getRenderingHandlers(elements, functions);

  const updatePins = () => {
    clearPins();
    const filteredPins = window.filter.getFilterHandlers(elements, pins);
    renderPins(filteredPins);
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

  const getPopupHandlers = (popup) => {
    const onPopupEscPress = (evt) => {
      if (evt.key === `Escape`) {
        popup.remove();
      }
    };

    const onPopupClick = (evt) => {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        popup.remove();
      }
    };

    return {onPopupEscPress, onPopupClick};
  };

  const handleSuccessfulUpload = () => {
    form.reset();
    pageActivation.setInactivePageMode();
    const successPopup = successfulUploadTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(successPopup);
    document.addEventListener(`keydown`, getPopupHandlers(successPopup).onPopupEscPress);
    document.addEventListener(`click`, getPopupHandlers(successPopup).onPopupClick);
  };

  const handleUploadError = () => {
    const errorPopup = uploadErrorTemplate.cloneNode(true);
    document.querySelector(`main`).appendChild(errorPopup);
    const errorButton = document.querySelector(`.error__button`);
    document.addEventListener(`keydown`, getPopupHandlers(errorPopup).onPopupEscPress);
    document.addEventListener(`click`, getPopupHandlers(errorPopup).onPopupClick);
    errorButton.addEventListener(`click`, getPopupHandlers(errorPopup).onPopupClick);
  };

  const pageActivation = window.activation.getPageActivationHandlers(elements, functions, loadURL, handleSuccess, handleError);

  const pinFeatures = {
    pinWidth: pageActivation.pinWidth,
    pinHeight: pageActivation.pinHeightActive
  };

  const onMainPinClick = window.pinMovement.getPinMovementHandlers(elements, pinFeatures).onMainPinClick;

  mainPin.addEventListener(`mousedown`, onMainPinClick);

  const {checkGuestNumberValidity, validateTitle, validateHousingType, validatePrice, validateCheckIn, validateCheckOut, validateImage} = window.form.getValidityCheckHandlers(elements);

  document.addEventListener(`DOMContentLoaded`, () => {
    checkGuestNumberValidity();
  });

  filters.addEventListener(`input`, window.debounce(() => {
    updatePins();
  }));

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

  pageActivation.setInactivePageMode();

  form.addEventListener(`submit`, (evt) => {
    window.upload.uploadForm(new FormData(form), handleSuccessfulUpload, handleUploadError);
    evt.preventDefault();
  });

  resetFormButton.addEventListener(`click`, (evt) => {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      evt.preventDefault();
      form.reset();
    }
  });

  window.main = {pageActivation};
})();
