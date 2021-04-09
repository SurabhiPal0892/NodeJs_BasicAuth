const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/verifyJwtToken");
const {
  getTasksByUserId,
  getUsers,
} = require("../controllers/users.controller");

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const users = await getUsers(req, res);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const taskData = await getTasksByUserId(req, res);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
