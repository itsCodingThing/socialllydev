require("module-alias/register");

const express = require("express");

const Post = require("@models/Post");

const router = express.Router();

// @route   GET api/post
// @desc    Get all post
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["name", "username", "avatar"])
      .populate("likes.user", ["name", "username", "avatar"])
      .populate("comments.user", ["name", "username", "avatar"])
      .select("-__v")
      .sort({ date: -1 })
      .lean();
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
