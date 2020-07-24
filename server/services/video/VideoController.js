const { Video } = require("../../models/Video");

exports.createVideo = (req, res) => {
  // 비디오 정보를 저장합니다.
  const video = new Video(req.body);

  video.save((error, video) => {
    if (error) return res.status(400).json({ success: false, error });

    return res.status(200).json({
      success: true,
    });
  });
};

exports.getVideo = (req, res) => {
  Video.findOne({ _id: req.params.videoId })
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      video.views++;
      video.save((error, video) => {
        if (error) return res.status(400).json({ success: false, error });

        res.status(200).json({ success: true, video });
      });
    });
};

exports.getVideos = (req, res) => {
  Video.find({ privacy: 1 })
    .sort("-createdAt")
    .limit(parseInt(req.query.limit))
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
};
