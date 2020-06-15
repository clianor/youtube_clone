const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

exports.handleCors = (router) => {
  router.use(cors({ credentials: true, origin: true }));
};

exports.handleBodyParsing = (router) => {
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
};

exports.handleCookieParsing = (router) => {
  router.use(cookieParser());
};

exports.handleCompression = (router) => {
  router.use(compression());
};
