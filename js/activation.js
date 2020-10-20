'use strict';

(() => {
  const MAIN_MOUSE_BUTTON = 0;

  const getPageActivationHandlers = (elements, url, onSuccess, onError) => {
    const pinWidth = elements.mainPin.offsetWidth;
    const pinHeight = elements.mainPin.offsetHeight;

    const pinHeightActive = pinHeight + 22;

    const mainPinX = elements.mainPin.offsetLeft + pinWidth / 2;
    const mainPinInactiveY = elements.mainPin.offsetTop + pinHeight / 2;

    const mainPinY = elements.mainPin.offsetTop + pinHeightActive;

    const setAddress = (x, y) => {
      elements.addressInput.setAttribute(`value`, `${Math.round(x)}, ${Math.round(y)}`);
    };

    const setInactivePageMode = () => {
      elements.form.classList.add(`ad-form--disabled`);

      for (let i = 0; i < elements.formFieldsets.length; i += 1) {
        elements.formFieldsets[i].setAttribute(`disabled`, ``);
      }

      for (let i = 0; i < elements.filtersFieldsets.length; i += 1) {
        elements.filtersFieldsets[i].setAttribute(`disabled`, ``);
      }

      setAddress(mainPinX, mainPinInactiveY);

      elements.mainPin.addEventListener(`mousedown`, onInactiveMainPinClick);

      elements.mainPin.addEventListener(`keydown`, onInactiveMainPinEnterPress);
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
      elements.map.classList.remove(`map--faded`);
      elements.form.classList.remove(`ad-form--disabled`);

      for (let i = 0; i < elements.formFieldsets.length; i += 1) {
        elements.formFieldsets[i].removeAttribute(`disabled`);
      }

      setAddress(mainPinX, mainPinY);
      window.load.loadData(url, onSuccess, onError);

      elements.mainPin.removeEventListener(`mousedown`, onInactiveMainPinClick);
      elements.mainPin.removeEventListener(`keydown`, onInactiveMainPinEnterPress);
    };

    return {setInactivePageMode, pinWidth, pinHeight};
  };

  const activateFilters = (elements) => {
    for (let i = 0; i < elements.filtersFieldsets.length; i += 1) {
      elements.filtersFieldsets[i].removeAttribute(`disabled`);
    }
  };

  window.activation = {getPageActivationHandlers, activateFilters};
})();
