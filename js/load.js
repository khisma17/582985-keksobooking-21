'use strict';

const TIMEOUT_IN_MS = 10000;

const StatusCodes = {
  OK: 200
};

const loadData = (url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCodes.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, url);
  xhr.send();
};

window.load = {loadData};
