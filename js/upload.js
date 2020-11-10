"use strict";

const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;

const StatusCodes = {
  OK: 200
};

const uploadForm = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCodes.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.open(`POST`, UPLOAD_URL);
  xhr.send(data);
};

window.upload = {uploadForm};
