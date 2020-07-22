const { auth } = require("../../../middleware/auth");
const {
  uploadVideoController,
  getVideoThumbnailController,
} = require("./VideoFileController");

const router = require("express").Router();

router.post("/", auth, (req, res) => {
  uploadVideoController(req, res);
});

router.post("/thumbnail", auth, (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임 가져오기
  getVideoThumbnailController(req, res);
});

module.exports = router;
