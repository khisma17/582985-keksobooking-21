'use strict';

(() => {
  const getRandomValueFromRange = (minimumValue, maximumValue) => Math.floor(Math.random() * (maximumValue - minimumValue + 1) + minimumValue);

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

  const getRandomArrayElement = (array) => {
    const randomIndex = getRandomValueFromRange(0, array.length - 1);

    return array[randomIndex];
  };

  window.main = {getRandomValueFromRange, takeRandomNumberOfArrayElements, getRandomArrayElement};
})();
