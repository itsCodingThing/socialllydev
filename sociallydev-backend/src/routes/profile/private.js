require("module-alias/register");

const express = require("express");
const Profile = require("@models/Profile");
const auth = require("@middle/auth");

const router = express.Router();
router.use(auth);

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.userId,
    }).populate("user", ["email"]);

    res.json(profile.toObject({ versionKey: false }));
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server is responding" }] });
  }
});

// @route   PUT api/profile/me
// @desc    Update user profile
// @access  Private
router.put("/", async (req, res) => {
  let body = req.body;
  try {
    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $set: { ...body } },
      { new: true }
    ).populate("user", ["email"]);

    res.json(updatedProfile.toJSON({ versionKey: false }));
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server is responding" }] });
  }
});

module.exports = router;
