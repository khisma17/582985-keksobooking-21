'use strict';

const OFFER_TITLES = ['Чулан под лестницей', 'Здоровенный особняк в пригороде', '東京の中心部にある素敵で居心地の良いアパート', 'Домик на дереве', 'Комфортные апартаменты в окрестностях императорского дворца', 'Палатка в тени сакуры', 'удобный 2 спальня плоский япония вниз город', 'Нежилое помещение', 'Комната в общежитии', 'Номер в капсульном отеле'];

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = ['4 минуты пешком от станции Mikawashima, 12 минут пешком от станции Nippori', 'Отель находится в 6 минутах ходьбы от станции Син-Окубо, недалеко от Корейского города и различных достопримечательностей.', 'Здесь рекомендуется останавливаться при большом количестве людей, например путешествовать с семьей и друзьями!', 'Комната квартиры 4 эт. И у нас нет лифта ....! Так что вам нужно использовать лестницу. (+ _ +)', 'Здравствуйте! Добро пожаловать в Токио! Это общий номер гостиничного типа. Здесь просто, но легко остановиться, и он подходит для путешествий в одиночку. Этот недавно открывшийся отель оформлен в японских традициях. приветствуем вас в чистом и модном помещении.', 'Концепция «Маленькой Японии» - «Знакомьтесь с местными жителями», соединяющая мир с местными жителями. Гости могут получить незабываемые впечатления о местной Японии в нашем кафе и баре на первом этаже.', 'Смешанный номер-капсула для гостей женского и мужского пола. Каждая кровать отделена стеной и занавеской.', 'Оставайся в Асакусе! Работайте в Асакусе! Почему бы вам не насладиться Асакусой, остановившись в вновь открывшемся компактном отеле?'];

const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const pinsList = document.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

const map = document.querySelector('.map');

const pins = [];

const getRandomFromArray = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

const getRandomValue = function (maximumValue) {
  return Math.ceil(Math.random() * maximumValue);
};

const getRandomValueIncludingNil = function (maximumValue) {
  return Math.round(Math.random() * maximumValue);
};

const getRandomValueFromRange = function (minimumValue, maximumValue) {
  return Math.round(Math.random() * (maximumValue - minimumValue) + minimumValue);
};

const createRandomLengthArray = function (array) {
  const newArray = [];
  for (let i = 0; i < getRandomValueIncludingNil(array.length); i++) {
    const newArrayElement = getRandomFromArray(array);
    if (newArray.indexOf(newArrayElement) === -1) {
      newArray.push(newArrayElement);
    }
  }
  return newArray;
};

const generatePin = function (number) {
  const pin = {};
  pin.author = {};
  pin.offer = {};
  pin.location = {};
  pin.author.avatar = `img/avatars/user0${number + 1}.png`;
  pin.offer.title = getRandomFromArray(OFFER_TITLES);
  pin.offer.price = getRandomValue(20000);
  pin.offer.type = getRandomFromArray(OFFER_TYPES);
  pin.offer.rooms = getRandomValue(5);
  pin.offer.guests = getRandomValue(10);
  pin.offer.checkin = getRandomFromArray(CHECKIN_TIMES);
  pin.offer.checkout = getRandomFromArray(CHECKOUT_TIMES);
  pin.offer.features = createRandomLengthArray(FEATURES);
  pin.offer.description = getRandomFromArray(DESCRIPTIONS);
  pin.offer.photos = createRandomLengthArray(PHOTOS);
  pin.location.x = getRandomValueIncludingNil(1200);
  pin.location.y = getRandomValueFromRange(130, 630);

  return pin;
};

map.classList.remove('map--faded');

const generatePinsList = function (number) {
  for (let i = 0; i < number; i++) {
    pins.push(generatePin(i));
  }
  return pins;
};

const renderPin = function (pin) {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', `left: ${pin.location.x + 25}px; top: ${pin.location.y + 70}px;`);
  pinElement.querySelector('img').setAttribute('src', `${pin.author.avatar}`);
  pinElement.querySelector('img').setAttribute('alt', `${pin.offer.title}`);
  return pinElement;
};

const fillPinsList = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  pinsList.appendChild(fragment);
};

generatePinsList(8);

fillPinsList(pins);
