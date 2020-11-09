require("module-alias/register");

const express = require("express");

const router = express.Router();

router.use("/", require("./public"));
router.use("/me", require("./private"));

module.exports = router;
