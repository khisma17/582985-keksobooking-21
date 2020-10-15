'use strict';

(() => {
  const checkGuestNumberValidity = (guestsInput, roomsInput) => {
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

  window.form = {checkGuestNumberValidity};
})();
