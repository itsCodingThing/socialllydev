const express = require("express");

const router = express.Router();

router.use("/me", require("./private"));
router.use("/", require("./public"));

module.exports = router;
