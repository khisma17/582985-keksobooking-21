const { dirname } = require("path");
const path = require("path");

module.exports = {
  entry: [
    "./js/debounce.js",
    "./js/filter.js",
    "./js/backend.js",
    "./js/imagePreview.js",
    "./js/card.js",
    "./js/form.js",
    "./js/activation.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/pinMovement.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
