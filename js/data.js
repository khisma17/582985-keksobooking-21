'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const filters = document.querySelector(`.map__filters`);
  const filtersFieldsets = filters.querySelectorAll(`select, fieldset`);
  const addressInput = document.querySelector(`#address`);

  const PIN_WIDTH = mainPin.offsetWidth;
  const PIN_HEIGHT = mainPin.offsetHeight;

  const PIN_HEIGHT_ACTIVE = PIN_HEIGHT + 22; // 22 - длина острого конца, он описан псевдоэлементом - не придумал как его вытащить из DOM

  const MAIN_PIN_INACTIVE_X = mainPin.offsetLeft + PIN_WIDTH / 2;
  const MAIN_PIN_INACTIVE_Y = mainPin.offsetTop + PIN_HEIGHT / 2;

  const mainPinX = MAIN_PIN_INACTIVE_X;
  const mainPinY = mainPin.offsetTop + PIN_HEIGHT_ACTIVE;

  const MAIN_MOUSE_BUTTON = 0;

  const setInactivePageMode = () => {
    form.classList.add(`ad-form--disabled`);

    for (let i = 0; i < formFieldsets.length; i += 1) {
      formFieldsets[i].setAttribute(`disabled`, ``);
    }

    for (let i = 0; i < filtersFieldsets.length; i += 1) {
      filtersFieldsets[i].setAttribute(`disabled`, ``);
    }
  };

  const setAddress = (x, y) => {
    addressInput.setAttribute(`value`, `${Math.round(x)}, ${Math.round(y)}`);
  };

  const onInactiveMainPinClick = (evt) => {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      activatePage();
      setAddress(mainPinX, mainPinY);
    }
  };

  const onInactiveMainEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
      setAddress(mainPinX, mainPinY);
    }
  };

  mainPin.addEventListener(`mousedown`, onInactiveMainPinClick);

  mainPin.addEventListener(`keydown`, onInactiveMainEnterPress);

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);

    for (let i = 0; i < formFieldsets.length; i += 1) {
      formFieldsets[i].removeAttribute(`disabled`);
    }

    for (let i = 0; i < filtersFieldsets.length; i += 1) {
      filtersFieldsets[i].removeAttribute(`disabled`);
    }

    mainPin.removeEventListener(`mousedown`, onInactiveMainPinClick);
    mainPin.removeEventListener(`keydown`, onInactiveMainEnterPress);
  };

  setInactivePageMode();

  window.data = {map, PIN_WIDTH, PIN_HEIGHT, addressInput, setAddress, mainPin, mainPinX, mainPinY, MAIN_PIN_INACTIVE_X, MAIN_PIN_INACTIVE_Y};
})();
