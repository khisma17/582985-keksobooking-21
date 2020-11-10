"use strict";

const MAIN_MOUSE_BUTTON = 0;

const getPinMovementHandlers = (elements, pinFeatures) => {
  let pointerPosition = {
    left: null,
    top: null
  };

  const pinWidth = pinFeatures.pinWidth;
  const pinHeight = pinFeatures.pinHeight;

  const leftBorder = 0;
  const rightBorder = elements.map.offsetWidth;
  const topBorder = 130;
  const bottomBorder = 630;

  let addressValue = {
    x: null,
    y: null
  };

  const moveTo = (evt, draggable) => {
    draggable.style.left = `${Math.max(leftBorder - pinWidth / 2, Math.min(evt.clientX - pointerPosition.left, rightBorder - pinWidth / 2))}px`;
    draggable.style.top = `${Math.max(topBorder - pinHeight, Math.min(evt.clientY - pointerPosition.top, bottomBorder - pinHeight))}px`;
  };

  const setAddress = (draggable) => {
    addressValue.x = Math.round(draggable.offsetLeft + pinWidth / 2);
    addressValue.y = Math.round(draggable.offsetTop + pinHeight);
    elements.addressInput.value = `${addressValue.x}, ${addressValue.y}`;
  };

  const onMouseMove = (evt) => {
    evt.preventDefault();
    moveTo(evt, elements.mainPin);
    setAddress(elements.mainPin);
  };

  const onMouseUp = (evt) => {
    evt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  const onMainPinClick = (evt) => {
    evt.preventDefault();
    if (evt.button === MAIN_MOUSE_BUTTON) {
      pointerPosition.left = evt.clientX - elements.mainPin.offsetLeft;
      pointerPosition.top = evt.clientY - elements.mainPin.offsetTop;
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };

  return {onMainPinClick};
};
window.pinMovement = {getPinMovementHandlers};
