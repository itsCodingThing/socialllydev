const supertest = require("supertest");

const { clearAllDb, setupDb, fakeUser } = require("../setup");
const app = require("../../app");

let request = supertest(app);

process.env.NODE_ENV = "test";

beforeAll(async () => {
  await clearAllDb();
  await setupDb();
});

test("Should give all available post 👍", async () => {
  await request.get("/api/post/").send().expect(200);
});

test("Should give all the post of current user 👍", async () => {
  await request.get("/api/post/me/all").set("x-auth-token", fakeUser.token).send().expect(200);
});

test("Should create new post for user 👍", async () => {
  await request
    .post("/api/post/me/")
    .set("x-auth-token", fakeUser.token)
    .send({ description: "fake post" })
    .expect(200);
});

test("Should give like to the post 👍", async () => {
  await request.put(`/api/post/me/like/${fakeUser.postId}`).set("x-auth-token", fakeUser.token).send().expect(200);
});

test("Should give comment to the post 👍", async () => {
  await request
    .put(`/api/post/me/comment/${fakeUser.postId}`)
    .set("x-auth-token", fakeUser.token)
    .send({ text: "fake comment" })
    .expect(200);
});

test("Should unlike the post 👍", async () => {
  await request.put(`/api/post/me/unlike/${fakeUser.postId}`).set("x-auth-token", fakeUser.token).send().expect(200);
});

test("Should delete the comment on the post 👍", async () => {
  await request
    .put(`/api/post/me/comment/${fakeUser.postId}/${fakeUser.commentId}`)
    .set("x-auth-token", fakeUser.token)
    .send()
    .expect(200);
});

test("Should delete the post by post id 👍", async () => {
  await request.delete(`/api/post/me/${fakeUser.postId}`).set("x-auth-token", fakeUser.token).send().expect(200);
});
