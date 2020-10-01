'use strict';

const OFFER_TITLES = [
  'Чулан под лестницей',
  'Здоровенный особняк в пригороде',
  '東京の中心部にある素敵で居心地の良いアパート',
  'Домик на дереве', 'Комфортные апартаменты в окрестностях императорского дворца',
  'Палатка в тени сакуры',
  'удобный 2 спальня плоский япония вниз город',
  'Нежилое помещение',
  'Комната в общежитии',
  'Номер в капсульном отеле'
];

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  '4 минуты пешком от станции Mikawashima, 12 минут пешком от станции Nippori',
  'Отель находится в 6 минутах ходьбы от станции Син-Окубо, недалеко от Корейского города и различных достопримечательностей.',
  'Здесь рекомендуется останавливаться при большом количестве людей, например путешествовать с семьей и друзьями!',
  'Комната квартиры 4 эт. И у нас нет лифта ....! Так что вам нужно использовать лестницу. (+ _ +)',
  'Добро пожаловать в Токио! Это общий номер гостиничного типа, и он подходит для путешествий в одиночку. Отель оформлен в японских традициях.',
  'Концепция «Маленькой Японии», соединяющая мир с местными жителями. Гости могут получить незабываемые впечатления о Японии в нашем кафе и баре на первом этаже.',
  'Смешанный номер-капсула для гостей женского и мужского пола. Каждая кровать отделена стеной и занавеской.',
  'Оставайся в Асакусе! Работайте в Асакусе! Почему бы вам не насладиться Асакусой, остановившись в вновь открывшемся компактном отеле?'
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const NUMBER_OF_PINS = 8;

const pinsList = document.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

const map = document.querySelector('.map');

const getRandomValueFromRange = (minimumValue, maximumValue) => Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomValueFromRange(0, array.length - 1);

  return array[randomIndex];
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

const generatePin = (pinNumber) => {
  const pin = {};
  pin.author = {};
  pin.offer = {};
  pin.location = {};
  pin.author.avatar = `img/avatars/user0${pinNumber + 1}.png`;
  pin.offer.title = getRandomArrayElement(OFFER_TITLES);
  pin.offer.price = getRandomValueFromRange(0, 20000);
  pin.offer.type = getRandomArrayElement(OFFER_TYPES);
  pin.offer.rooms = getRandomValueFromRange(1, 5);
  pin.offer.guests = getRandomValueFromRange(1, 10);
  pin.offer.checkin = getRandomArrayElement(CHECKIN_TIMES);
  pin.offer.checkout = getRandomArrayElement(CHECKOUT_TIMES);
  pin.offer.features = takeRandomNumberOfArrayElements(FEATURES);
  pin.offer.description = getRandomArrayElement(DESCRIPTIONS);
  pin.offer.photos = takeRandomNumberOfArrayElements(PHOTOS);
  pin.location.x = getRandomValueFromRange(0, 1200);
  pin.location.y = getRandomValueFromRange(130, 630);

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
  const pinElementImage = pinElement.querySelector('img');

  pinElement.setAttribute('style', `left: ${pinData.location.x + 25}px; top: ${pinData.location.y + 70}px;`);
  pinElementImage.setAttribute('src', `${pinData.author.avatar}`);
  pinElementImage.setAttribute('alt', `${pinData.offer.title}`);
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

map.classList.remove('map--faded');

const pins = generatePinsList(NUMBER_OF_PINS);

const pinsFragment = createPinsFragment(pins, NUMBER_OF_PINS);

pinsList.appendChild(pinsFragment);
