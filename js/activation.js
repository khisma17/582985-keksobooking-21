'use strict';

(() => {
  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const filters = document.querySelector(`.map__filters`);
  const filtersFieldsets = filters.querySelectorAll(`select, fieldset`);
  const addressInput = document.querySelector(`#address`);

  const PIN_WIDTH = mainPin.offsetWidth;
  const PIN_HEIGHT = mainPin.offsetHeight;

  const PIN_HEIGHT_ACTIVE = PIN_HEIGHT + 22;

  const MAIN_PIN_INACTIVE_X = mainPin.offsetLeft + PIN_WIDTH / 2;
  const MAIN_PIN_INACTIVE_Y = mainPin.offsetTop + PIN_HEIGHT / 2;

  const mainPinX = MAIN_PIN_INACTIVE_X;
  const mainPinY = mainPin.offsetTop + PIN_HEIGHT_ACTIVE;

  const MAIN_MOUSE_BUTTON = 0;

  const setAddress = (x, y) => {
    addressInput.setAttribute(`value`, `${Math.round(x)}, ${Math.round(y)}`);
  };

  const initiatePageActivation = (url, onSuccess, onError) => {
    const setInactivePageMode = () => {
      form.classList.add(`ad-form--disabled`);

      for (let i = 0; i < formFieldsets.length; i += 1) {
        formFieldsets[i].setAttribute(`disabled`, ``);
      }

      for (let i = 0; i < filtersFieldsets.length; i += 1) {
        filtersFieldsets[i].setAttribute(`disabled`, ``);
      }

      setAddress(MAIN_PIN_INACTIVE_X, MAIN_PIN_INACTIVE_Y);

      mainPin.addEventListener(`mousedown`, onInactiveMainPinClick);

      mainPin.addEventListener(`keydown`, onInactiveMainPinEnterPress);
    };

    const onInactiveMainPinClick = (evt) => {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        activatePage();
      }
    };

    const onInactiveMainPinEnterPress = (evt) => {
      if (evt.key === `Enter`) {
        activatePage();
      }
    };

    const activatePage = () => {
      map.classList.remove(`map--faded`);
      form.classList.remove(`ad-form--disabled`);

      for (let i = 0; i < formFieldsets.length; i += 1) {
        formFieldsets[i].removeAttribute(`disabled`);
      }

      for (let i = 0; i < filtersFieldsets.length; i += 1) {
        filtersFieldsets[i].removeAttribute(`disabled`);
      }

      setAddress(mainPinX, mainPinY);
      window.load.loadData(url, onSuccess, onError);

      mainPin.removeEventListener(`mousedown`, onInactiveMainPinClick);
      mainPin.removeEventListener(`keydown`, onInactiveMainPinEnterPress);
    };

    return {setInactivePageMode, onInactiveMainPinClick, onInactiveMainPinEnterPress, activatePage};
  };

  window.activation = {initiatePageActivation, PIN_WIDTH, PIN_HEIGHT};
})();
