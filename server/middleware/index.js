const {
  handleCors,
  handleBodyParsing,
  handleCookieParsing,
  handleCompression,
} = require("./common");

module.exports = [
  handleCors,
  handleBodyParsing,
  handleCookieParsing,
  handleCompression,
];
