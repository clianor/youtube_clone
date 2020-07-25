const { Subscriber } = require("../../models/Subscriber");

exports.getSubscribeCount = (req, res) => {
  Subscriber.find({ userTo: req.params.userTo }).exec((error, subscribers) => {
    if (error) return res.status(400).send(error);
    res
      .status(200)
      .json({ success: true, subscribeNumber: subscribers.length });
  });
};

exports.setSubscribe = async (req, res) => {
  const { userTo, userFrom } = req.body;

  if (userTo === userFrom)
    res
      .status(400)
      .json({ success: false, message: "자기 자신을 구독처리할 수 없습니다." });

  Subscriber.findOne({ userTo, userFrom }).exec((error, subscribe) => {
    if (error) return res.status(400).json({ success: false, error });

    if (subscribe) {
      subscribe.remove();

      return res.status(200).json({
        success: true,
        subscribed: false,
        message: "구독을 해지하였습니다.",
      });
    }

    let newSubscribe = new Subscriber({ userTo, userFrom });
    newSubscribe.save((error, subscribe) => {
      if (error) return res.status(400).json({ success: false, error });

      return res
        .status(200)
        .json({ success: true, subscribed: true, message: "구독하였습니다." });
    });
  });
};

exports.getSubscribeStatus = (req, res) => {
  const { userTo, userFrom } = req.query;

  if (userTo === userFrom)
    return res.status(200).json({ success: true, isSubscribe: true });

  Subscriber.findOne({ userTo, userFrom }).exec((error, subscribe) => {
    if (subscribe) {
      return res.status(200).json({ success: true, isSubscribe: true });
    }

    return res.status(200).json({ success: true, isSubscribe: false });
  });
};
