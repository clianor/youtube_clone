const router = require("express").Router();
const AuthRoutes = require("./auth/routes");
const VideoRoutes = require("./video/routes");
const SubscribeRoutes = require("./subscribe/routes");
const Likes = require("./likes/routes");

router.use("/auth", AuthRoutes);
router.use("/video", VideoRoutes);
router.use("/subscribe", SubscribeRoutes);
router.use("/likes", Likes);

module.exports = router;
