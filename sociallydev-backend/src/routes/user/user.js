require("module-alias/register");

const express = require("express");
const { check, validationResult } = require("express-validator/check");

const User = require("@models/User");
const Profile = require("@models/Profile");
const Post = require("@models/Post");
const jwtoken = require("@utils/jwtoken");
const hashpassword = require("@utils/hashPassword");
const auth = require("@middle/auth");

const router = express.Router();

// @route  POST api/user/register
// @desc   register new user or signin new users
// @access public
router.post(
  "/register",
  [
    check("name", "Name is required").exists().not().isEmpty(),
    check("email", "Please include a valid email").exists().isEmail(),
    check("password", "Please enter your password or check your password length").exists().isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const results = validationResult(req);

    // check for any errors in the body
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }

    const { name, email, password } = req.body;

    try {
      // check if user exists
      let isUserExists = await User.findOne({ email });
      if (isUserExists) {
        return res.status(400).json({ errors: [{ msg: "user already exists" }] });
      }

      //hash the password
      let hash = hashpassword.encryptPassword(password);

      // create new user with default profile
      let user = new User({
        email,
        password: hash,
      });
      await user.save();

      let profile = new Profile({
        user: user._id,
        name: name,
        username: `${user.id}-${Date.now()}`,
      });
      await profile.save();

      //create the token
      const payload = {
        userId: user.id,
      };
      let token = jwtoken.createJWT(payload);
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "server is not responding" }] });
    }
  }
);

// @route  POST api/user/login
// @desc   login user
// @access public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").exists().isEmail(),
    check("password", "Password Required").exists().not().isEmpty(),
  ],
  async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ errors: [...results.array()] });
    }

    const { email, password } = req.body;

    try {
      // check if user exists in db
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User does'nt exists with this email" }] });
      }

      // check if user has given correct password
      const isMatch = hashpassword.compareHashPassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // create new token for user
      const payload = {
        userId: user.id,
      };
      let token = jwtoken.createJWT(payload);
      res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "server is not responding" }] });
    }
  }
);

// @route   PUT api/user/update
// @desc    update the user data
// @access  private
router.put("/update", auth, async (req, res) => {
  let body = req.body;
  let userId = req.userId;

  if (body.password) {
    let hash = hashpassword.encryptPassword(body.password);
    body.password = hash;
  }

  let user = await User.findByIdAndUpdate(userId, { $set: { ...body } }, { new: true }).select("-password");
  res.json(user.toJSON());
});

// @route  DELETE api/user/delete
// @desc   delete user's account, profile, posts
// @access private
router.delete("/delete", auth, async (req, res) => {
  let userId = req.userId;

  try {
    await User.findByIdAndDelete(userId);
    await Profile.findOneAndDelete({ user: userId });
    await Post.deleteMany({ user: userId });
    res.json({ msg: "user is deleted from database" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "error" }] });
  }
});

module.exports = router;
