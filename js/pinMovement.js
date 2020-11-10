"use strict";

const MAIN_MOUSE_BUTTON = 0;

const getPinMovementHandlers = (elements, pinFeatures) => {
  const LEFT_BORDER = 0;
  const TOP_BORDER = 130;
  const BOTTOM_BORDER = 630;

  let pointerPosition = {
    left: null,
    top: null
  };

  const pinWidth = pinFeatures.pinWidth;
  const pinHeight = pinFeatures.pinHeight;

  const rightBorder = elements.map.offsetWidth;

  let addressValue = {
    x: null,
    y: null
  };

  const moveTo = (evt, draggable) => {
    draggable.style.left = `${Math.max(LEFT_BORDER - pinWidth / 2, Math.min(evt.clientX - pointerPosition.left, rightBorder - pinWidth / 2))}px`;
    draggable.style.top = `${Math.max(TOP_BORDER - pinHeight, Math.min(evt.clientY - pointerPosition.top, BOTTOM_BORDER - pinHeight))}px`;
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
