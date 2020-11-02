const { dirname } = require("path");
const path = require("path");

module.exports = {
  entry: [
    "./js/helpers.js",
    "./js/load.js",
    "./js/upload.js",
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
