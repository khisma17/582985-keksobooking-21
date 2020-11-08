'use strict';

const OFFER_TYPES_MAPPING = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const textMapping = {
  rooms: {
    singular: `комната`,
    nominative: `комнаты`,
    genitive: `комнат`
  },
  guests: {
    singular: `гостя`,
    plural: `гостей`
  }
};

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
  photosElement.width = 45;
  photosElement.height = 40;
  photosElement.alt = `Фотография жилья`;
  return photosElement;
};

const getProperWordFormRooms = (roomsNumber, roomsMapping) => {
  const remainderOf100 = Math.abs(roomsNumber) % 100;
  const remainderOf10 = roomsNumber % 10;
  if (remainderOf100 > 10 && remainderOf100 < 20) {
    return roomsMapping.rooms.genitive;
  } if (remainderOf10 > 1 && remainderOf10 < 5) {
    return roomsMapping.rooms.nominative;
  } if (remainderOf10 === 1) {
    return roomsMapping.rooms.singular;
  }
  return roomsMapping.rooms.genitive;
};

const getProperWordFormGuests = (guestsNumber, guestsMapping) => {
  const remainderOf10 = Math.abs(guestsNumber) % 10;
  if (remainderOf10 === 1) {
    return guestsMapping.guests.singular;
  }
  return guestsMapping.guests.plural;
};

const createCard = (cardTemplate, cardData) => {
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

  const properRoomsName = getProperWordFormRooms(cardData.offer.rooms, textMapping);
  const properGuestsName = getProperWordFormGuests(cardData.offer.guests, textMapping);
  cardElementCapacity.textContent = `${cardData.offer.rooms} ${properRoomsName} для ${cardData.offer.guests} ${properGuestsName}`;

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

window.card = {createCard};
