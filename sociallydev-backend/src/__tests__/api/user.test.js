const supertest = require("supertest");

const {
  clearAllDb,
  setupDb,
  fakeUser: { token, userOne, fakePassword },
} = require("../setup");
const app = require("../../app");

let request = supertest(app);

process.env.NODE_ENV = "test";

beforeAll(async () => {
  await clearAllDb();
  await setupDb();
});

test("Should register new user", async () => {
  let response = await request
    .post("/api/user/register")
    .send({ name: "Kaali", email: "kaali@gmail.com", password: "12345678" })
    .expect(200);

  expect(response.body).toMatchObject({ token: expect.anything() });
});

test("Should login user 👍", async () => {
  let response = await request
    .post("/api/user/login")
    .send({
      email: userOne.email,
      password: fakePassword,
    })
    .expect(200);

  expect(response.body).toMatchObject({ token: expect.anything() });
});

test("Should update user email, password", async () => {
  let newPassword = "87654321";
  let newEmail = "manoj@gmail.com";

  let response1 = await request
    .put("/api/user/update")
    .set("x-auth-token", token)
    .send({ password: newPassword, email: newEmail })
    .expect(200);
  expect(response1.body).toMatchObject({ _id: userOne._id.toString(), email: newEmail });

  let response2 = await request
    .post("/api/user/login")
    .send({
      email: newEmail,
      password: newPassword,
    })
    .expect(200);

  expect(response2.body).toMatchObject({ token: expect.anything() });
});
