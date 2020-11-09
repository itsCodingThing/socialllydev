require("module-alias/register");

const express = require("express");
const Profile = require("@models/Profile");

const router = express.Router();

// @route   GET api/profile/user/:profile_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:profile_id", async (req, res) => {
  let profileId = req.params.profile_id;
  try {
    const profile = await Profile.findById(profileId).populate("user", ["email"]);

    if (!profile) {
      return res.status(400).json({ errors: [{ msg: "Profile not found" }] });
    }

    res.json(profile.toJSON());
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "Profile not found" }] });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
