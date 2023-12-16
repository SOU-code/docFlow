const express = require("express");
const {
  createDocController,
  updateDocController,
  deleteDocController,
  getDocController,
  userDocController,
  addUserController,
} = require("../controllers/docController.js");

const router = express.Router();

router.post("/create-doc", createDocController);

router.put("/update-doc/:id", updateDocController);

router.post("/add-user/:id", addUserController);

router.delete("/delete-doc/:id", deleteDocController);

router.get("/get-doc/:id", getDocController);

router.get("/user-doc/:id", userDocController);

module.exports = router;
