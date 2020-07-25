const { Likes } = require("../../models/Likes");

exports.getVideoLike = (req, res) => {
  Likes.findOne({ videoId: req.query.videoId, userId: req.query.userId }).exec(
    (error, likes) => {
      if (!likes || error) {
        return res.status(200).json({ success: false, error });
      }

      return res.status(200).json({ success: true, isLike: likes.isLike });
    }
  );
};
