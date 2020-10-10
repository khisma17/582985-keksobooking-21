'use strict';

(() => {
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

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const generatePin = (pinNumber) => {
    const pin = {};
    pin.author = {};
    pin.offer = {};
    pin.location = {};
    pin.author.avatar = `img/avatars/user0${pinNumber + 1}.png`;
    pin.offer.title = window.main.getRandomArrayElement(OFFER_TITLES);
    pin.offer.price = window.main.getRandomValueFromRange(0, 20000);
    pin.offer.type = window.main.getRandomArrayElement(OFFER_TYPES);
    pin.offer.rooms = window.main.getRandomArrayElement(ROOMS);
    pin.offer.guests = window.main.getRandomArrayElement(GUESTS);
    pin.offer.checkin = window.main.getRandomArrayElement(CHECKIN_TIMES);
    pin.offer.checkout = window.main.getRandomArrayElement(CHECKOUT_TIMES);
    pin.offer.features = window.main.takeRandomNumberOfArrayElements(FEATURES);
    pin.offer.description = window.main.getRandomArrayElement(DESCRIPTIONS);
    pin.offer.photos = window.main.takeRandomNumberOfArrayElements(PHOTOS);
    pin.location.x = window.main.getRandomValueFromRange(0, 1200);
    pin.location.y = window.main.getRandomValueFromRange(130, 630);
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

  const pins = generatePinsList(NUMBER_OF_PINS);

  const createPin = (pinData) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImage = pinElement.querySelector(`img`);

    pinElement.setAttribute(`style`, `left: ${pinData.location.x + window.data.PIN_WIDTH / 2}px; top: ${pinData.location.y + window.data.PIN_HEIGHT}px;`);
    pinElementImage.setAttribute(`src`, `${pinData.author.avatar}`);
    pinElementImage.setAttribute(`alt`, `${pinData.offer.title}`);

    return pinElement;
  };

  window.pin = {pins, currentPin, createPin, generatePinsList};
})();
