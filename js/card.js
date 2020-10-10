'use strict';

(() => {
  const OFFER_TYPES_MAPPING = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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
    cardElementCapacity.textContent = `${cardData.offer.rooms} ${cardData.offer.guests}`;
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

  const card = createCard(window.pin.pins[window.pin.currentPin]);

  window.card = {card};
})();
