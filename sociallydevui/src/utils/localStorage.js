import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

function saveToken(token) {
  let { userId } = jwtDecode(token);

  localStorage.setItem("token", token);
  localStorage.setItem("id", userId);
}

function saveProfile(profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}

function getUserPayload() {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  let profile = localStorage.getItem("profile");

  let auth = false;
  let today = dayjs(Date.now()).unix();

  if (token) {
    let { exp } = jwtDecode(token);
    let expire = dayjs(exp);

    if (expire.isAfter(today)) {
      auth = true;
    }
  }

  if (profile) {
    profile = JSON.parse(profile);
  }

  return { token, id, auth, profile };
}

function clearAllToken() {
  localStorage.clear();
}

export { saveToken, getUserPayload, clearAllToken, saveProfile };
