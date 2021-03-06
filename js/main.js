"use strict";

const MAIN_MOUSE_BUTTON = 0;

const guestsInput = document.querySelector(`#capacity`);
const roomsInput = document.querySelector(`#room_number`);
const mapFilters = document.querySelector(`.map__filters-container`);
const map = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const successfulUploadTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const uploadErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const resetFormButton = document.querySelector(`.ad-form__reset`);
const sendFormButton = document.querySelector(`.ad-form__submit`);

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
const photoInput = document.querySelector(`#images`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoPreviewContainer = document.querySelector(`.ad-form__photo`);

const elements = {mainPin, map, form, formFieldsets, filtersFieldsets, addressInput,
  pinTemplate, pinsList, cardTemplate, mapFilters,
  guestsInput, roomsInput, titleInput, housingTypeInput, priceInput, checkInInput, checkOutInput,
  housingTypeFilter, priceFilter, roomsNumberFilter, guestsNumberFilter, featuresInputs};

const validatedInputs = [titleInput, priceInput, guestsInput];

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
  const pinElements = pinsList.querySelectorAll(`.map__pin`);
  pinElements.forEach((element) => {
    element.classList.remove(`map__pin--active`);
  });
};

const functions = {clearPins, clearCards};

const {renderPins} = window.map.getRenderingHandlers(elements, functions);

const filterPins = window.filter.getFilterHandlers(elements);

const updatePins = () => {
  clearPins();
  const filteredPins = filterPins(pins);
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
      document.removeEventListener(`keydown`, getPopupHandlers(popup).onPopupEscPress);
      document.removeEventListener(`click`, getPopupHandlers(popup).onPopupClick);
    }
  };

  const onPopupClick = (evt) => {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      popup.remove();
      document.removeEventListener(`click`, getPopupHandlers(popup).onPopupClick);
      document.removeEventListener(`keydown`, getPopupHandlers(popup).onPopupEscPress);
    }
  };

  return {onPopupEscPress, onPopupClick};
};

const handleSuccessfulUpload = () => {
  form.reset();
  filters.reset();
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

const pageActivation = window.activation.getPageActivationHandlers(elements, functions, handleSuccess, handleError);

const pinFeatures = {
  pinWidth: pageActivation.pinWidth,
  pinHeight: pageActivation.pinHeightActive
};

const onMainPinClick = window.pinMovement.getPinMovementHandlers(elements, pinFeatures).onMainPinClick;

mainPin.addEventListener(`mousedown`, onMainPinClick);

const {validateGuestsNumber, setTitleConstraints, setHousingTypeConstraints, setPriceConstraints, setCheckInConstraints, setCheckOutConstraints, setImageConstraints} = window.form.getValidityCheckHandlers(elements);

document.addEventListener(`DOMContentLoaded`, validateGuestsNumber);

housingTypeFilter.addEventListener(`input`, updatePins);

filters.addEventListener(`input`, window.debounce(updatePins));
guestsInput.addEventListener(`input`, validateGuestsNumber);

roomsInput.addEventListener(`input`, validateGuestsNumber);

housingTypeInput.addEventListener(`input`, setHousingTypeConstraints);

checkInInput.addEventListener(`input`, setCheckInConstraints);

checkOutInput.addEventListener(`input`, setCheckOutConstraints);

setTitleConstraints();
setPriceConstraints();
setImageConstraints(avatarInput);
setImageConstraints(photoInput);

window.imagePreview.getImagePreview(avatarInput, avatarPreview);

const photoPreview = document.createElement(`img`);
photoPreview.alt = `Фотография жилья`;
photoPreview.style.width = `100%`;

photoInput.addEventListener(`change`, () => {
  photoPreviewContainer.appendChild(photoPreview);
});

window.imagePreview.getImagePreview(photoInput, photoPreview);
pageActivation.setInactivePageMode();

form.addEventListener(`submit`, (evt) => {
  window.backend.uploadForm(new FormData(form), handleSuccessfulUpload, handleUploadError);
  evt.preventDefault();
});

sendFormButton.addEventListener(`click`, () => {
  validatedInputs.forEach((input) => {
    input.style = !input.checkValidity() ? `box-shadow: 0 0 2px 2px red;` : ``;
  });
});

validatedInputs.forEach((input) => {
  input.addEventListener(`input`, () => {
    input.style = input.checkValidity() ? `` : `box-shadow: 0 0 2px 2px red`;
  });
});

resetFormButton.addEventListener(`click`, (evt) => {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    evt.preventDefault();
    form.reset();
    filters.reset();
    pageActivation.setInactivePageMode();
  }
});

window.main = {pageActivation};
