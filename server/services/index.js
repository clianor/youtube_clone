const router = require("express").Router();
const AuthRoutes = require("./auth/routes");

router.use("/auth", AuthRoutes);

router.get("/", (req, res, next) => {
  res.status(200).send("api root");
});

module.exports = router;
