const jwt = require("jsonwebtoken");

let secretKey = process.env.SECRET_TOKEN_KEY;
let expiresIn = "720h";

function createJWT(payload) {
  let token = jwt.sign(payload, secretKey, {
    expiresIn,
  });

  return token;
}

function verifyJWT(token) {
  let payload = jwt.verify(token, secretKey);
  return payload;
}

module.exports = {
  createJWT,
  verifyJWT,
};
