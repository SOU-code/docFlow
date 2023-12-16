const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

module.exports = router;
