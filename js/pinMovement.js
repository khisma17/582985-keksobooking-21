'use strict';

(() => {
  const MAIN_MOUSE_BUTTON = 0;

  const getPinMovementHandlers = (elements, pinFeatures) => {
    const pinWidth = pinFeatures.pinWidth;
    const pinHeight = pinFeatures.pinHeight;

    const leftBorder = 0;
    const rightBorder = elements.map.offsetWidth;
    const topBorder = 130;
    const bottomBorder = 630;

    const onMainPinClick = (evt) => {
      if (evt.button === MAIN_MOUSE_BUTTON) {
        let startCoordinates = {
          x: evt.clientX,
          y: evt.clientY
        };

        const onMouseMove = (moveEvt) => {
          const shift = {
            x: moveEvt.clientX - startCoordinates.x,
            y: moveEvt.clientY - startCoordinates.y
          };

          startCoordinates = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          const newCoordinates = {
            x: elements.mainPin.offsetLeft + shift.x,
            y: elements.mainPin.offsetTop + shift.y
          };

          const addressValue = {
            x: newCoordinates.x + pinWidth / 2,
            y: newCoordinates.y + pinHeight
          };

          if (addressValue.x < leftBorder) {
            elements.mainPin.style.left = `${leftBorder - pinWidth / 2}px`;
          } else if (addressValue.x > rightBorder) {
            elements.mainPin.style.left = `${rightBorder - pinWidth / 2}px`;
          } else {
            elements.mainPin.style.left = `${newCoordinates.x}px`;
          }

          if (addressValue.y < topBorder) {
            elements.mainPin.style.top = `${topBorder - pinHeight}px`;
          } else if (addressValue.y > bottomBorder) {
            elements.mainPin.style.top = `${bottomBorder - pinHeight}px`;
          } else {
            elements.mainPin.style.top = `${newCoordinates.y}px`;
          }

          elements.addressInput.value = `${addressValue.x}, ${addressValue.y}`;
        };

        const onMouseUp = () => {
          document.removeEventListener(`mousemove`, onMouseMove);
          document.removeEventListener(`mouseup`, onMouseUp);
        };

        document.addEventListener(`mousemove`, onMouseMove);
        document.addEventListener(`mouseup`, onMouseUp);
      }
    };
    return {onMainPinClick};
  };
  window.pinMovement = {getPinMovementHandlers};
})();
