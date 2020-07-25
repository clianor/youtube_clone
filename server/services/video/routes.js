const { auth } = require("../../middleware/auth");
const { createVideo, getVideo, getVideos } = require("./VideoController");

const videoFileRoutes = require("./file/routes");

const router = require("express").Router();
router.use("/file", videoFileRoutes);

router.post("/", auth, (req, res) => {
  if (!req.user) return res.json({ success: false, errMsg: req.error });

  createVideo(req, res);
});

router.post("/:videoId", (req, res) => {
  getVideo(req, res);
});

router.get("/", (req, res) => {
  getVideos(req, res);
});

module.exports = router;
