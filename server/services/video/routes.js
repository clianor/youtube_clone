const { auth } = require("../../middleware/auth");
const {
  uploadVideoController,
  getVideoThumbnailController,
} = require("./VideoController");

const router = require("express").Router();

router.post("/", (req, res) => {
  uploadVideoController(req, res);
});

router.post("/thumbnail", (req, res) => {
  // 썸네일 생성하고 비디오 러닝타임 가져오기
  getVideoThumbnailController(req, res);
});

module.exports = router;
