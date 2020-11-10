"use strict";

const MAIN_MOUSE_BUTTON = 0;
const PIN_POINTER_HEIGHT = 22;

const getPageActivationHandlers = (elements, functions, url, onSuccess, onError) => {
  const pinWidth = elements.mainPin.offsetWidth;
  const pinHeight = elements.mainPin.offsetHeight;

  const pinHeightActive = pinHeight + PIN_POINTER_HEIGHT;

  const mainPinX = elements.mainPin.offsetLeft + pinWidth / 2;
  const mainPinInactiveY = elements.mainPin.offsetTop + pinHeight / 2;

  const mainPinY = elements.mainPin.offsetTop + pinHeightActive;

  const mainPinInitialX = elements.mainPin.offsetLeft;
  const mainPinInitialY = elements.mainPin.offsetTop;

  const setAddress = (x, y) => {
    elements.addressInput.setAttribute(`value`, `${Math.round(x)}, ${Math.round(y)}`);
  };

  const setInactivePageMode = () => {
    if (!elements.map.classList.contains(`map--faded`)) {
      elements.map.classList.add(`map--faded`);
    }
    elements.form.classList.add(`ad-form--disabled`);

    functions.clearPins();
    functions.clearCards();

    elements.formFieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });

    // for (let i = 0; i < elements.formFieldsets.length; i += 1) {
    //   elements.formFieldsets[i].setAttribute(`disabled`, ``);
    // }

    elements.filtersFieldsets.forEach((fieldset) => {
      fieldset.setAttribute(`disabled`, ``);
    });

    // for (let i = 0; i < elements.filtersFieldsets.length; i += 1) {
    //   elements.filtersFieldsets[i].setAttribute(`disabled`, ``);
    // }

    elements.mainPin.style.left = `${mainPinInitialX}px`;
    elements.mainPin.style.top = `${mainPinInitialY}px`;

    setAddress(mainPinX, mainPinInactiveY);

    elements.mainPin.addEventListener(`mousedown`, onInactiveMainPinClick);

    elements.mainPin.addEventListener(`keydown`, onInactiveMainPinEnterPress);
  };

  const activatePage = () => {
    elements.map.classList.remove(`map--faded`);
    elements.form.classList.remove(`ad-form--disabled`);

    elements.formFieldsets.forEach((fieldset) => {
      fieldset.removeAttribute(`disabled`);
    });

    // for (let i = 0; i < elements.formFieldsets.length; i += 1) {
    //   elements.formFieldsets[i].removeAttribute(`disabled`);
    // }

    setAddress(mainPinX, mainPinY);
    window.load.loadData(url, onSuccess, onError);

    elements.mainPin.removeEventListener(`mousedown`, onInactiveMainPinClick);
    elements.mainPin.removeEventListener(`keydown`, onInactiveMainPinEnterPress);
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

  return {setInactivePageMode, pinWidth, pinHeight, pinHeightActive};
};

const activateFilters = (elements) => {
  elements.filtersFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute(`disabled`);
  });

  // for (let i = 0; i < elements.filtersFieldsets.length; i += 1) {
  //   elements.filtersFieldsets[i].removeAttribute(`disabled`);
  // }
};

window.activation = {getPageActivationHandlers, activateFilters};
