const {
  handleCors,
  handleBodyParsing,
  handleCookieParsing,
  handleCompression,
  handleLogging,
} = require("./common");

module.exports = [
  handleLogging,
  handleCors,
  handleBodyParsing,
  handleCookieParsing,
  handleCompression,
];
