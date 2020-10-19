'use strict';

(() => {
  const MAIN_MOUSE_BUTTON = 0;

  const mainPin = document.querySelector(`.map__pin--main`);
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const filters = document.querySelector(`.map__filters`);
  const filtersFieldsets = filters.querySelectorAll(`select, fieldset`);
  const addressInput = document.querySelector(`#address`);

  const pinWidth = mainPin.offsetWidth;
  const pinHeight = mainPin.offsetHeight;

  const pinHeightActive = pinHeight + 22;

  const mainPinX = mainPin.offsetLeft + pinWidth / 2;
  const mainPinInactiveY = mainPin.offsetTop + pinHeight / 2;

  const mainPinY = mainPin.offsetTop + pinHeightActive;

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

      setAddress(mainPinX, mainPinInactiveY);

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

  window.activation = {initiatePageActivation, pinWidth, pinHeight};
})();
