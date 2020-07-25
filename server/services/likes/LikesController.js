const { Likes } = require("../../models/Likes");
const { Video } = require("../../models/Video");

exports.getVideoLike = (req, res) => {
  Likes.findOne({ videoId: req.query.videoId, userId: req.query.userId }).exec(
    async (error, likes) => {
      if (error) {
        return res.status(200).json({ success: false, error });
      }

      const likesCount = await Likes.find({
        videoId: req.query.videoId,
        isLike: true,
      }).countDocuments();

      const disLikesCount = await Likes.find({
        videoId: req.query.videoId,
        isLike: false,
      }).countDocuments();

      return res.status(200).json({
        success: true,
        isLike: likes ? likes.isLike : undefined,
        Likes: likesCount,
        DisLikes: disLikesCount,
      });
    }
  );
};

exports.setVideoLike = async (req, res) => {
  const { videoId, userId, isLike } = req.body;
  const { writer } = await Video.findOne({ _id: videoId }).populate("writer");

  if (String(req.user._id) === String(writer._id))
    return res.status(401).json({
      success: false,
      error: "자신의 영상에는 좋아요를 누를 수 없습니다.",
    });

  Likes.findOne({ videoId, userId }).exec((error, likes) => {
    if (error) return res.status(400).json({ success: false, error });

    if (!likes) {
      // 없을때
      const likes = new Likes({
        videoId,
        userId,
        isLike,
      });

      likes.save((error, likes) => {
        if (error) return res.status(400).json({ success: false, error });

        return res.status(200).json({ success: true, isLike: likes.isLike });
      });
    } else {
      if (isLike === likes.isLike) {
        // 한 번 더 눌렀을 때
        likes.remove();

        return res.status(200).json({ success: true, isLike: undefined });
      }

      // 다른 걸 눌렀을 때
      likes.isLike = isLike;

      likes.save((error, likes) => {
        if (error) return res.status(400).json({ success: false, error });

        return res.status(200).json({ success: true, isLike: likes.isLike });
      });
    }
  });
};
