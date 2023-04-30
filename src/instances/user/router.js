const express = require("express");
const { NOT_FOUND } = require("./constants");
const User = require("./model");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({});
  if (users.length !== 0) return res.send({ data: users });
  return res.send(NOT_FOUND);
});

router.post("/", (req, res) => {
  const newUser = req.body;
  console.log("User created:", newUser);
  res.status(201).send({ message: "User created successfully", data: newUser });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ id: userId });
  if (user) return res.send({ data: user });
  return res.send(NOT_FOUND);
});

module.exports = router;
