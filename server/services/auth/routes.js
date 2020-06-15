const { request } = require("express");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.send("auth root");
});

router.get("/login", (req, res, next) => {
  res.send("login root");
});

router.get("/register", (req, res, next) => {
  res.send("register root");
});

module.exports = router;
