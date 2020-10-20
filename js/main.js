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

  const elements = {mainPin, map, form, formFieldsets, filtersFieldsets, addressInput, pinTemplate, pinsList, cardTemplate, mapFilters};

  const loadURL = `https://21.javascript.pages.academy/keksobooking/data`;

  let pins = [];

  const renderPins = window.map.getRenderingHandlers(elements).renderPins;
  const renderCards = window.map.getRenderingHandlers(elements).renderCards;

  const handleSuccess = (data) => {
    pins = data;
    updatePins();
    renderCards(pins);
    window.activation.activateFilters(elements);
  };

  const updatePins = () => {
    const sameHousingTypePins = pins.filter((pin) => {
      return pin.offer.type === housingTypeFilter.value;
    });
    if (housingTypeFilter.value !== `any`) {
      renderPins(sameHousingTypePins);
    } else {
      renderPins(pins);
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

  document.addEventListener(`DOMContentLoaded`, () => {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  housingTypeFilter.addEventListener(`input`, () => {
    updatePins();
  });

  guestsInput.addEventListener(`input`, () => {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  roomsInput.addEventListener(`input`, () => {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  const pageActivation = window.activation.getPageActivationHandlers(elements, loadURL, handleSuccess, handleError);

  pageActivation.setInactivePageMode();

  window.main = {pageActivation};
})();
