const { auth } = require("../../middleware/auth");
const { uploadVideoController } = require("./VideoController");

const router = require("express").Router();

router.post("/", (req, res) => {
  uploadVideoController(req, res);
});

module.exports = router;
