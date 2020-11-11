"use strict";

const TIMEOUT = 10000;
const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

const StatusCodes = {
  OK: 200
};

const getData = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCodes.OK) {
      onLoad(xhr.response);
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

  return xhr;
};

const loadData = (onLoad, onError) => {
  const xhr = getData(onLoad, onError);
  xhr.open(`GET`, LOAD_URL);
  xhr.send();
};

const uploadForm = (data, onLoad, onError) => {
  const xhr = getData(onLoad, onError);
  xhr.open(`POST`, UPLOAD_URL);
  xhr.send(data);
};

window.backend = {loadData, uploadForm};
