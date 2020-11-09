const mongoose = require("mongoose");

const User = require("@models/User");
const Profile = require("@models/Profile");
const Post = require("@models/Post");

const hashPassword = require("@utils/hashPassword");
const jwtoken = require("@utils/jwtoken");

let userOneId = new mongoose.Types.ObjectId();
let userOneProfileId = new mongoose.Types.ObjectId();
let postId = new mongoose.Types.ObjectId();
let commentId = new mongoose.Types.ObjectId();

let fakePassword = "password";

let hash = hashPassword.encryptPassword(fakePassword);
let token = jwtoken.createJWT({ userId: userOneId.toString() });

let userOne = {
  _id: userOneId,
  email: "ramesh@gmail.com",
  password: hash,
};

let profile = {
  _id: userOneProfileId,
  name: "ramesh",
  username: "ramesh123",
  user: userOne._id,
};

let post = {
  _id: postId,
  user: userOneProfileId,
  description: "fake post 2",
  image: "",
  likes: [],
  comments: [
    {
      _id: commentId,
      user: userOneId,
      text: "fake comment",
    },
  ],
};

async function clearAllDb() {
  await User.deleteMany();
  await Profile.deleteMany();
  await Post.deleteMany();
}

async function setupDb() {
  await new User({ ...userOne }).save();
  await new Profile({ user: userOneId, ...profile }).save();
  await new Post({ ...post }).save();
}

module.exports = {
  clearAllDb,
  setupDb,
  fakeUser: {
    fakePassword,
    userOne,
    profile,
    post,
    token,
    postId,
    commentId,
    userOneId,
    userOneProfileId,
  },
};
