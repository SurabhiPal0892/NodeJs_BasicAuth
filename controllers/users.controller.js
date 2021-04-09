const UserTasks = require("../models/userTasks");
const User = require("../models/user");
const ObjectID = require("mongodb").ObjectID;
const { HttpStatusCode } = require("../configs/app.constants");

const getTasksByUserId = async function (req, res) {
  try {
    const id = req.params.id ? req.params.id : undefined;
    const idExists = await checkIfUserIdExists(id);
    if (idExists.length > 0) {
      const data = await UserTasks.aggregate([
        { $match: { userId: req.params.id } },
        { $project: { tasks: 1, _id: 0 } },
      ]);
      res.status(HttpStatusCode.OK).json(data);
    } else {
      res.sendStatus(HttpStatusCode.NOT_FOUND);
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async function (req, res) {
  try {
    let pageOpts = getPageOpts(req.query.page, req.query.perPage);
    const data = await User.aggregate([
      { $project: { email: 1, _id: 0 } },
      { $skip: pageOpts.perPage * (pageOpts.page - 1) },
      { $limit: pageOpts.perPage },
    ]);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getPageOpts = (page, perPage) => {
  let pageOpts = {};
  if (page && perPage) {
    pageOpts["page"] = parseInt(page);
    pageOpts["perPage"] = parseInt(perPage);
  } else {
    pageOpts["page"] = 1;
    pageOpts["perPage"] = 2;
  }
  return pageOpts;
};

const checkIfUserIdExists = async function (id) {
  try {
    let user = await User.find({ _id: ObjectID(id) }).exec();
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTasksByUserId, getUsers };
