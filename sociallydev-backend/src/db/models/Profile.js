const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: { type: String, default: "" },
  dob: { type: String, default: "" },
  company: { type: String, default: "" },
  location: { type: String, default: "" },
  skills: [String],
  social: [String],
  bio: {
    type: String,
    maxlength: 300,
    default: "nope no bio is here",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
