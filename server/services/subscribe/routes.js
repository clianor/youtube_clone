const { auth } = require("../../middleware/auth");
const {
  getSubscribeCount,
  setSubscribe,
  getSubscribeStatus,
} = require("./SubscribeController");

const router = require("express").Router();

router.get("/:userTo", (req, res) => {
  getSubscribeCount(req, res);
});

router.get("/", (req, res) => {
  getSubscribeStatus(req, res);
});

router.post("/", auth, (req, res) => {
  if (!req.user) return res.json({ success: false, errMsg: req.error });

  setSubscribe(req, res);
});

module.exports = router;
