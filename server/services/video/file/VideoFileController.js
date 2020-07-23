const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// STORAGE MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

exports.uploadVideoController = (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

exports.getVideoThumbnailController = (req, res) => {
  let filePath = "";
  let fileDuration = "";
  let fileWidth = "";
  let fileHeight = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.filePath, function (error, metadata) {
    fileDuration = metadata.format.duration;
    fileWidth = metadata.streams[0].width;
    fileHeight = metadata.streams[0].height;

    if (error) {
      return res.status(400).json({ success: false, error });
    }
  });

  // 썸네일 생성
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        isVertical: parseInt(fileWidth) < parseInt(fileHeight),
        filePath,
        fileDuration,
      });
    })
    .on("error", function (error) {
      console.error(error);
      return res.status(400).json({ success: false, error });
    })
    .screenshots({
      count: 1,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
};
