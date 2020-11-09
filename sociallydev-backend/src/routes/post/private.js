require("module-alias/register");

const express = require("express");

const auth = require("@middle/auth");
const Post = require("@models/Post");
const Profile = require("@models/Profile");

const router = express.Router();

// all the routes are protected
router.use(auth);

// @route   GET api/post/me/all
// @desc    Get all post of current user
// @access  Private
router.get("/all", async (req, res) => {
  let userId = req.userId;
  try {
    let profile = await Profile.findOne({ user: userId });
    let allPost = await Post.find({ user: profile.id })
      .populate("user", ["name", "username", "avatar"])
      .populate("likes.user", ["name", "username", "avatar"])
      .populate("comments.user", ["name", "username", "avatar"])
      .select("-__v")
      .sort({ date: -1 })
      .lean();

    res.json(allPost);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/post/me
// @desc    Create Post
// @access  Private
router.post("/", async (req, res) => {
  let userId = req.userId;
  let body = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });
    let newPost = new Post({
      user: profile.id,
      ...body,
    });
    let post = await newPost.save();
    res.json(post.toJSON({ versionKey: false }));
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/post/me/:post_id
// @desc    Delete post by id
// @access  Private
router.delete("/:post_id", async (req, res) => {
  let postId = req.params.post_id;
  let userId = req.userId;

  try {
    let profile = await Profile.findOne({ user: userId });
    let post = await Post.findById(postId).populate("user", ["name", "username"]);

    // check the post owner
    if (profile.id === post.user._id) {
      return res.status(401).json({ msg: "user not authorized" });
    }

    // remove post
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/post/me/like/:post_id
// @desc    like post by id
// @access  Private
router.put("/like/:post_id", async (req, res) => {
  let postId = req.params.post_id;
  let userId = req.userId;

  try {
    let profile = await Profile.findOne({ user: userId });
    let likedPostFound = await Post.findOne({ _id: postId, "likes.user": profile.id });
    let post = await Post.findOne({ _id: postId });

    // add like at the begining of the array
    if (!likedPostFound) {
      post.likes.unshift({ user: profile._id });
      await post.save();
      let newPost = await Post.findById(postId)
        .populate("likes.user", ["name", "username", "avatar"])
        .lean()
        .select("-__v");
      res.json(newPost.likes);
    } else {
      res.json({ msg: "post is already liked" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/post/me/unlike/:id
// @desc    unlike post by id
// @access  Private
router.put("/unlike/:post_id", async (req, res) => {
  let postId = req.params.post_id;
  let userId = req.userId;

  try {
    let profile = await Profile.findOne({ user: userId });
    let postFound = await Post.findOne({ _id: postId, "likes.user": profile.id });

    if (postFound) {
      let post = await Post.findByIdAndUpdate(postId, { $pull: { likes: { user: profile.id } } }, { new: true })
        .populate("likes.user", ["name", "username", "avatar"])
        .lean()
        .select("-__v");
      res.json(post.likes);
    } else {
      res.json({ msg: "post is already unliked" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route   Put api/post/me/comment/:post_id
// @desc    Add comment on Post
// @access  Private
router.put("/comment/:post_id", async (req, res) => {
  let userId = req.userId;
  let postId = req.params.post_id;
  let body = req.body;

  try {
    let profile = await Profile.findOne({ user: userId });
    let post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { text: body.text, user: profile.id } } },
      { new: true }
    )
      .populate("comments.user", ["name", "username", "avatar"])
      .lean()
      .select("-__v");

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/post/me/comment/:post_id/:comment_id
// @desc    Delete Comment
// @access  Private
router.put("/comment/:post_id/:comment_id", async (req, res) => {
  let { post_id: postId, comment_id: commentId } = req.params;

  try {
    // find the post
    let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } }, { new: true })
      .populate("comments.user", ["name", "username", "avatar"])
      .lean()
      .select("-__v");
    res.json(post.comments);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
