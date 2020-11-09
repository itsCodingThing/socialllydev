const supertest = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const User = require("@models/User");
const Profile = require("@models/Profile");
const hashPassword = require("@utils/hashPassword");
const jwtoken = require("@utils/jwtoken");

let request = supertest(app);

process.env.NODE_ENV = "test";

let userOneId = new mongoose.Types.ObjectId();
let userOneProfileId = new mongoose.Types.ObjectId();
let hash = hashPassword.encryptPassword("password");
let token = jwtoken.createJWT({ userId: userOneId.toString() });

let userOne = {
  _id: userOneId,
  email: "test@gmail.com",
  password: hash,
};

let userOneProfile = {
  _id: userOneProfileId,
  name: "test",
  username: "test@123",
  user: userOneId,
  avatar: "",
  dob: "",
  company: "",
  skills: [],
  social: [],
  bio: "nope yeh!!",
  date: Date.now(),
};

beforeAll(async () => {
  await User.deleteMany();
  await Profile.deleteMany();
  await new User({ ...userOne }).save();
  await new Profile({ ...userOneProfile }).save();
});

let expectBody = {
  _id: userOneProfileId.toString(),
  name: userOneProfile.name,
  username: userOneProfile.username,
  avatar: "",
  dob: "",
  company: "",
  skills: [],
  social: [],
  user: { _id: userOneId.toString(), email: userOne.email },
  bio: userOneProfile.bio,
};

test("Should get current user's profile 👍", async () => {
  let response = await request
    .get("/api/profile/me/")
    .set("x-auth-token", token)
    .send()
    .expect(200);
  expect(response.body).toMatchObject(expectBody);
});

let updateProfile = {
  bio: "new bio",
  company: "google",
};

test("Should update current user's profile", async () => {
  let response = await request
    .put("/api/profile/me/")
    .set("x-auth-token", token)
    .send(updateProfile)
    .expect(200);
  expect(response.body).toMatchObject({ ...expectBody, ...updateProfile });
});

test("Should get user profile", async () => {
  let profileId = userOneProfile._id;
  let response = await request
    .get(`/api/profile/user/${profileId}`)
    .send()
    .expect(200);
  expect(response.body).toMatchObject({ ...expectBody, ...updateProfile });
});
