const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikesSchema = mongoose.Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    isLike: {
      type: Schema.Types.Boolean,
    },
  },
  { timestamps: true }
);

const Likes = mongoose.model("Likes", LikesSchema);

module.exports = { Likes };
