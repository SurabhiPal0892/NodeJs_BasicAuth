const { HttpStatusCode } = require("../configs/app.constants");
require("dotenv").config();
const User = require("../models/user");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
SALT_WORK_FACTOR = 10;

const createUser = async function (req, res) {
  try {
    const headerToken = req.headers.token ? req.headers.token : undefined;
    if (headerToken == process.env.AUTH_TOKEN) {
      const userData = createUserBody(req, res);
      let user = await checkIfUserExistsInDb(userData.email);
      if (user) {
        const isUserAuthenticated = await validatePassword(
          userData.password,
          user
        );
        if (isUserAuthenticated) {
          const token = await generateJwtToken(user);
          res.status(HttpStatusCode.OK).send(token);
        } else {
          res.status(HttpStatusCode.BAD_REQUEST).send("Invalid email/password");
        }
      } else {
        const createdUser = await createUserInDB(userData);
        const token = await generateJwtToken(createdUser);
        res.status(HttpStatusCode.OK).send(token);
      }
    } else {
      res.sendStatus(HttpStatusCode.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async function (req, res) {
  try {
    const headerToken = req.headers.token ? req.headers.token : undefined;
    if (headerToken == process.env.AUTH_TOKEN) {
      let id = req.params.id;
      let oldData = await User.findById(id).exec();
      if (oldData) {
        await User.deleteOne({ _id: ObjectID(id) });
        res.status(HttpStatusCode.OK).send("Deleted");
      } else {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      }
    } else {
      res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    }
  } catch (error) {
    console.log(error);
  }
};

const createUserBody = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  return userData;
};

const checkIfUserExistsInDb = async function (emailId) {
  try {
    let user = await User.findOne({ email: emailId }).exec();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const validatePassword = async function (password, user) {
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword;
  } catch (error) {
    console.log(error);
  }
};

const createUserInDB = async function (userData) {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    userData.password = await bcrypt.hash(userData.password, salt);
    const newUser = new User(userData);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    console.log(error);
  }
};

const generateJwtToken = async function (user) {
  if (user[0]) {
    id = user[0]._id;
  } else {
    id = user._id;
  }
  return jwt.sign({ _id: id }, process.env.JWT_PRIVATE_KEY);
};

module.exports = { createUser, deleteUser };
