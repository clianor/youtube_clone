const { auth } = require("../../middleware/auth");
const { getVideoLike } = require("./LikesController");

const router = require("express").Router();

router.get("/:videoId", auth, (req, res) => {
  if (!req.user) return res.status(200).json({ success: false });

  getVideoLike(req, res);
});

module.exports = router;
