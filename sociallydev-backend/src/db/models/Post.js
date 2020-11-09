const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: "profile", required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "profile",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
