const router = require("express").Router();
const AuthRoutes = require("./auth/routes");
const VideoRoutes = require("./video/routes");

router.use("/auth", AuthRoutes);
router.use("/video", VideoRoutes);

module.exports = router;
