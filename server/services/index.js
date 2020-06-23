const router = require("express").Router();
const AuthRoutes = require("./auth/routes");

router.use("/auth", AuthRoutes);

router.get("/hello", (req, res, next) => {
  res.send("hello");
});

module.exports = router;
