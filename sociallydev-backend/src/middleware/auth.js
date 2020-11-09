const jwtoken = require("../utils/jwtoken");

module.exports = function (req, res, next) {
  // get token from the header
  const token = req.header("Authorization");

  // check if no token
  if (!token) {
    return res.status(401).json({ errors: [{ msg: "authorization denied" }] });
  }

  // verify token
  try {
    const decode = jwtoken.verifyJWT(token);
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
};
