import { getUserPayload } from "./localStorage";

let baseUrl = "https://sociallly.herokuapp.com/api";

// eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3000/api";
}

function registerNewUser(userData) {
  return fetch(`${baseUrl}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

function updateUserProfile(update) {
  return fetch(`${baseUrl}/profile/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
    body: JSON.stringify(update),
  }).then((res) => {
    return res.json();
  });
}

function updateUserCredentials(update) {
  return fetch(`${baseUrl}/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
    body: JSON.stringify(update),
  }).then((res) => {
    return res.json();
  });
}

function fetchUserProfile(profileId) {
  let url = profileId ? `/profile/user/${profileId}` : "/profile/me";
  return fetch(`${baseUrl}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

function createNewPost(body) {
  return fetch(`${baseUrl}/post/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  });
}

function fetchUserPost() {
  return fetch(`${baseUrl}/post`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    return res.json();
  });
}

function fetchCurrentUserPost() {
  return fetch(`${baseUrl}/post/me/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

function loginUser(body) {
  return fetch(`${baseUrl}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    return res.json();
  });
}

function deletePost(id) {
  return fetch(`${baseUrl}/post/me/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

function addComment(postId, data) {
  return fetch(`${baseUrl}/post/me/comment/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserPayload().token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}

function deleteComment(postId, commentId) {
  return fetch(`${baseUrl}/post/me/comment/${postId}/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Athorization: `Bearer ${getUserPayload().token}`,
    },
  }).then((res) => {
    return res.json();
  });
}

export {
  deleteComment,
  addComment,
  updateUserCredentials,
  loginUser,
  fetchUserPost,
  fetchCurrentUserPost,
  createNewPost,
  fetchUserProfile,
  registerNewUser,
  updateUserProfile,
  deletePost,
};
