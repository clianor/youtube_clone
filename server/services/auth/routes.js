const { auth } = require("../../middleware/auth");
const {
  loginController,
  registerController,
  logoutController,
  infoController,
} = require("./AuthController");
// const { User } = require("../../models/User");

const router = require("express").Router();

router.post("/login", (req, res) => {
  loginController(req, res);
});

router.post("/register", (req, res) => {
  registerController(req, res);
});

router.get("/logout", auth, (req, res) => {
  logoutController(req, res);
});

router.get("/info", auth, (req, res) => {
  infoController(req, res);
});

// router.get("/users", (req, res) => {
//   User.find((err, users) => {
//     res.json(users);
//   });
// });

module.exports = router;
