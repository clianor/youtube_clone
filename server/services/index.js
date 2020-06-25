const router = require("express").Router();
const AuthRoutes = require("./auth/routes");

router.use("/auth", AuthRoutes);

module.exports = router;
