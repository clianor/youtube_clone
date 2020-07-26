const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fs = require("fs");
const morgan = require("morgan");
const winston = require("winston");
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

exports.handleLogging = (router) => {
  const logDir = __dirname + "/../logs";

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const infoTransport = new winston.transports.File({
    filename: "info.log",
    dirname: logDir,
    level: "info",
  });

  const errorTransport = new winston.transports.File({
    filename: "error.log",
    dirname: logDir,
    level: "error",
  });

  const logger = winston.createLogger({
    transports: [infoTransport, errorTransport],
  });

  const stream = {
    write: (message) => {
      logger.info(message);
    },
  };

  router.use(morgan("combined", { stream }));
};
