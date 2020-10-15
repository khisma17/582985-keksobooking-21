'use strict';

(() => {
  const guestsInput = document.querySelector(`#capacity`);
  const roomsInput = document.querySelector(`#room_number`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);

  const loadURL = `https://21.javascript.pages.academy/keksobooking/data`;

  const renderElements = window.map.initiateRendering(pinTemplate, pinsList, cardTemplate, map, mapFilters);

  document.addEventListener(`DOMContentLoaded`, function () {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  guestsInput.addEventListener(`input`, function () {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  roomsInput.addEventListener(`input`, function () {
    window.form.checkGuestNumberValidity(guestsInput, roomsInput);
  });

  const pageActivation = window.activation.initiatePageActivation(loadURL, renderElements, window.load.handleError);

  pageActivation.setInactivePageMode();
})();
