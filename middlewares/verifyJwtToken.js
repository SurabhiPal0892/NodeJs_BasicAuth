const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const { HttpStatusCode } = require("../configs/app.constants");

const authenticateJWT = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
      }
      req.user = user;
      verifyIfUserExits(req.user).then((isUserExits) => {
        if (isUserExits) {
          next();
        } else {
          res.sendStatus(HttpStatusCode.UNAUTHORIZED);
        }
      });
    });
  } else {
    res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }
};

const verifyIfUserExits = async function (user) {
  const id = user["_id"];
  const isFound = await User.findById(id).exec();
  if (isFound) {
    return true;
  } else {
    return false;
  }
};

module.exports = authenticateJWT;
