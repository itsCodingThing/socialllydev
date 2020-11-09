const express = require("express");
const path = require("path");
const cors = require("cors");

const userRouter = require("./routes/user/user");
const postRouter = require("./routes/post/post");
const profileRouter = require("./routes/profile/profile");

const connectDB = require("./db/db");
const app = express();

connectDB();

app.use(cors());
app.use(
  express.json({
    extended: false,
    limit: "500kb",
  })
);

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/profile", profileRouter);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

module.exports = app;
