const express = require("express");
const router = express.Router();
const { createUser, deleteUser } = require("../controllers/auth.controller");

router.post("/", createUser.bind(this));

router.delete("/:id", deleteUser.bind(this));

module.exports = router;
