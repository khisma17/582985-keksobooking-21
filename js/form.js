'use strict';

(() => {
  const guestsInput = document.querySelector(`#capacity`);
  const roomsInput = document.querySelector(`#room_number`);

  const checkGuestNumberValidity = () => {
    if (roomsInput.value === `1` && guestsInput.value !== `1`) {
      guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
      guestsInput.reportValidity();
    } else if (roomsInput.value === `2` && (guestsInput.value === `3` || guestsInput.value === `0`)) {
      guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
      guestsInput.reportValidity();
    } else if (roomsInput.value === `3` && guestsInput.value === `0`) {
      guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
      guestsInput.reportValidity();
    } else if (roomsInput.value === `100` && guestsInput.value !== `0`) {
      guestsInput.setCustomValidity(`Выбранное количество гостей не подходит под количество комнат`);
      guestsInput.reportValidity();
    } else {
      guestsInput.setCustomValidity(``);
      guestsInput.reportValidity();
    }
  };

  document.addEventListener(`DOMContentLoaded`, function () {
    checkGuestNumberValidity();
  });

  guestsInput.addEventListener(`input`, function () {
    checkGuestNumberValidity();
  });

  roomsInput.addEventListener(`input`, function () {
    checkGuestNumberValidity();
  });

  window.data.addressInput.setAttribute(`value`, `${Math.round(window.data.MAIN_PIN_INACTIVE_X)}, ${Math.round(window.data.MAIN_PIN_INACTIVE_Y)}`);
})();
