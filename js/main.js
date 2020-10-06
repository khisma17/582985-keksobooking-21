'use strict';

const OFFER_TITLES = [
  `Чулан под лестницей`,
  `Здоровенный особняк в пригороде`,
  `東京の中心部にある素敵で居心地の良いアパート`,
  `Домик на дереве`, `Комфортные апартаменты в окрестностях императорского дворца`,
  `Палатка в тени сакуры`,
  `удобный 2 спальня плоский япония вниз город`,
  `Нежилое помещение`,
  `Комната в общежитии`,
  `Номер в капсульном отеле`
];

const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];

const ROOMS = [`1 комната`, `2 комнаты`, `3 комнаты`, `100 комнат`];
const GUESTS = [`для 1 гостя`, `для 2 гостей`, `для 3 гостей`, `не для гостей`];

const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const OFFER_TYPES_MAPPING = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const DESCRIPTIONS = [
  `4 минуты пешком от станции Mikawashima, 12 минут пешком от станции Nippori`,
  `Отель находится в 6 минутах ходьбы от станции Син-Окубо, недалеко от Корейского города и различных достопримечательностей.`,
  `Здесь рекомендуется останавливаться при большом количестве людей, например путешествовать с семьей и друзьями!`,
  `Комната квартиры 4 эт. И у нас нет лифта ....! Так что вам нужно использовать лестницу. (+ _ +)`,
  `Добро пожаловать в Токио! Это общий номер гостиничного типа, и он подходит для путешествий в одиночку. Отель оформлен в японских традициях.`,
  `Концепция «Маленькой Японии», соединяющая мир с местными жителями. Гости могут получить незабываемые впечатления о Японии в нашем кафе и баре на первом этаже.`,
  `Смешанный номер-капсула для гостей женского и мужского пола. Каждая кровать отделена стеной и занавеской.`,
  `Оставайся в Асакусе! Работайте в Асакусе! Почему бы вам не насладиться Асакусой, остановившись в вновь открывшемся компактном отеле?`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const NUMBER_OF_PINS = 8;
const currentPin = 0;

const MAIN_MOUSE_BUTTON = 0;

const pinsList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mainPin = document.querySelector(`.map__pin--main`);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const map = document.querySelector(`.map`);
const mapFilters = document.querySelector(`.map__filters-container`);

const PIN_WIDTH = mainPin.offsetWidth;
const PIN_HEIGHT = mainPin.offsetHeight;

const PIN_HEIGHT_ACTIVE = PIN_HEIGHT + 22; // 22 - длина острого конца, он описан псевдоэлементом - не придумал как его вытащить из DOM

const MAIN_PIN_INACTIVE_X = mainPin.offsetLeft + PIN_WIDTH / 2;
const MAIN_PIN_INACTIVE_Y = mainPin.offsetTop + PIN_HEIGHT / 2;

const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const filters = document.querySelector(`.map__filters`);
const filtersFieldsets = filters.querySelectorAll(`select, fieldset`);

const addressInput = document.querySelector(`#address`);

const guestsInput = document.querySelector(`#capacity`);
const roomsInput = document.querySelector(`#room_number`);

const mainPinX = MAIN_PIN_INACTIVE_X;
const mainPinY = mainPin.offsetTop + PIN_HEIGHT_ACTIVE;

const setInactivePageMode = () => {
  form.classList.add(`ad-form--disabled`);

  for (let i = 0; i < formFieldsets.length; i += 1) {
    formFieldsets[i].setAttribute(`disabled`, ``);
  }

  for (let i = 0; i < filtersFieldsets.length; i += 1) {
    filtersFieldsets[i].setAttribute(`disabled`, ``);
  }
};

const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = getRandomValueFromRange(0, i);
    const t = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = t;
  }
  return newArray;
};

const takeRandomNumberOfArrayElements = (array) => {
  const randomIndex = getRandomValueFromRange(0, array.length - 1);

  const shuffledArray = shuffleArray(array);

  return shuffledArray.slice(0, randomIndex);
};

// Активация страницы

const setAddress = (x, y) => {
  addressInput.setAttribute(`value`, `${Math.round(x)}, ${Math.round(y)}`);
};

const onInactiveMainPinClick = (evt) => {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    activatePage();
    setAddress(mainPinX, mainPinY);
  }
};

const onInactiveMainEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
    setAddress(mainPinX, mainPinY);
  }
};

mainPin.addEventListener(`mousedown`, onInactiveMainPinClick);

mainPin.addEventListener(`keydown`, onInactiveMainEnterPress);

const activatePage = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);

  for (let i = 0; i < formFieldsets.length; i += 1) {
    formFieldsets[i].removeAttribute(`disabled`);
  }

  for (let i = 0; i < filtersFieldsets.length; i += 1) {
    filtersFieldsets[i].removeAttribute(`disabled`);
  }

  mainPin.removeEventListener(`mousedown`, onInactiveMainPinClick);
  mainPin.removeEventListener(`keydown`, onInactiveMainEnterPress);
};

// Валидация соответствия между количеством комнат и гостей

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

const getRandomValueFromRange = (minimumValue, maximumValue) => Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomValueFromRange(0, array.length - 1);

  return array[randomIndex];
};

// Заполнение списка похожих объявлений и отображение пинов

const generatePin = (pinNumber) => {
  const pin = {};
  pin.author = {};
  pin.offer = {};
  pin.location = {};
  pin.author.avatar = `img/avatars/user0${pinNumber + 1}.png`;
  pin.offer.title = getRandomArrayElement(OFFER_TITLES);
  pin.offer.price = getRandomValueFromRange(0, 20000);
  pin.offer.type = getRandomArrayElement(OFFER_TYPES);
  pin.offer.rooms = getRandomArrayElement(ROOMS);
  pin.offer.guests = getRandomArrayElement(GUESTS);
  pin.offer.checkin = getRandomArrayElement(CHECKIN_TIMES);
  pin.offer.checkout = getRandomArrayElement(CHECKOUT_TIMES);
  pin.offer.features = takeRandomNumberOfArrayElements(FEATURES);
  pin.offer.description = getRandomArrayElement(DESCRIPTIONS);
  pin.offer.photos = takeRandomNumberOfArrayElements(PHOTOS);
  pin.location.x = getRandomValueFromRange(0, 1200);
  pin.location.y = getRandomValueFromRange(130, 630);
  pin.offer.address = `${pin.location.x}, ${pin.location.y}`;

  return pin;
};

const generatePinsList = (numberOfPins) => {
  const pins = [];
  for (let i = 0; i < numberOfPins; i += 1) {
    pins.push(generatePin(i));
  }
  return pins;
};

const createPin = (pinData) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementImage = pinElement.querySelector(`img`);

  pinElement.setAttribute(`style`, `left: ${pinData.location.x + PIN_WIDTH / 2}px; top: ${pinData.location.y + PIN_HEIGHT}px;`);
  pinElementImage.setAttribute(`src`, `${pinData.author.avatar}`);
  pinElementImage.setAttribute(`alt`, `${pinData.offer.title}`);

  return pinElement;
};

const createPinsFragment = (pinsData, numberOfPins) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < numberOfPins; i += 1) {
    const pin = createPin(pinsData[i]);

    fragment.appendChild(pin);
  }
  return fragment;
};

addressInput.setAttribute(`value`, `${Math.round(MAIN_PIN_INACTIVE_X)}, ${Math.round(MAIN_PIN_INACTIVE_Y)}`);

setInactivePageMode();

const createFeaturesElement = (cardData, feature) => {
  const featuresElement = document.createElement(`li`);
  featuresElement.classList.add(`popup__feature`);
  featuresElement.classList.add(`popup__feature--${cardData.offer.features[feature]}`);
  return featuresElement;
};

const createPhotosElement = (cardData, photo) => {
  const photosElement = document.createElement(`img`);
  photosElement.src = cardData.offer.photos[photo];
  photosElement.classList.add(`popup__photo`);
  photosElement.width = `45`;
  photosElement.height = `40`;
  photosElement.alt = `Фотография жилья`;
  return photosElement;
};

const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(`.popup__title`);
  const cardElementAddress = cardElement.querySelector(`.popup__text--address`);
  const cardElementPrice = cardElement.querySelector(`.popup__text--price`);
  const cardElementType = cardElement.querySelector(`.popup__type`);
  const cardElementCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardElementTime = cardElement.querySelector(`.popup__text--time`);
  const cardElementFeatures = cardElement.querySelector(`.popup__features`);
  const cardElementDescription = cardElement.querySelector(`.popup__description`);
  const cardElementPhotos = cardElement.querySelector(`.popup__photos`);
  const cardElementAvatar = cardElement.querySelector(`.popup__avatar`);
  const offerType = cardData.offer.type;

  cardElementTitle.textContent = cardData.offer.title;
  cardElementAddress.textContent = cardData.offer.address;
  cardElementPrice.textContent = `${cardData.offer.price}₽/ночь`;
  cardElementType.textContent = OFFER_TYPES_MAPPING[offerType];
  cardElementCapacity.textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  cardElementTime.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;

  cardElementFeatures.innerHTML = ``;
  for (let i = 0; i < cardData.offer.features.length; i += 1) {
    const featuresElement = createFeaturesElement(cardData, i);
    cardElementFeatures.appendChild(featuresElement);
  }

  cardElementDescription.textContent = cardData.offer.description;

  cardElementPhotos.innerHTML = ``;
  for (let i = 0; i < cardData.offer.photos.length; i += 1) {
    const photosElement = createPhotosElement(cardData, i);
    cardElementPhotos.appendChild(photosElement);
  }

  cardElementAvatar.setAttribute(`src`, cardData.author.avatar);

  return cardElement;
};

const pins = generatePinsList(NUMBER_OF_PINS);

const pinsFragment = createPinsFragment(pins, NUMBER_OF_PINS);

pinsList.appendChild(pinsFragment);

const card = createCard(pins[currentPin]);

map.insertBefore(card, mapFilters);
