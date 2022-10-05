const mongoose = require("mongoose");

// Model d'un post qui sera envoyé dans la BDD
const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    pictureUrl: {
      type: String,
    },
    likers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
