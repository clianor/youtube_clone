const { auth } = require("../../middleware/auth");
const { getVideoLike, setVideoLike } = require("./LikesController");

const router = require("express").Router();

router.get("/:videoId", auth, (req, res) => {
  if (!req.user) return res.status(200).json({ success: false });

  getVideoLike(req, res);
});

router.post("/:videoId", auth, (req, res) => {
  if (!req.user) return res.status(200).json({ success: false });

  setVideoLike(req, res);
});

module.exports = router;
