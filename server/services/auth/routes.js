const { auth } = require("../../middleware/auth");
const {
  loginController,
  registerController,
  logoutController,
  infoController,
} = require("./AuthController");

const router = require("express").Router();

router.post("/login", (req, res) => {
  loginController(req, res);
});

router.post("/register", (req, res) => {
  registerController(req, res);
});

router.get("/logout", auth, (req, res) => {
  if (!req.user) return res.json({ success: false, errMsg: req.error });

  logoutController(req, res);
});

router.get("/info", auth, (req, res) => {
  if (!req.user) return res.json({ success: false, errMsg: req.error });

  infoController(req, res);
});

module.exports = router;
