const express = require("express");
const { NOT_FOUND } = require("./constants");
const User = require("./model");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({});
  if (users.length !== 0) return res.send({ data: users });
  return res.send(NOT_FOUND);
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.phone)
    return res.status(400).send({ message: "invalid data" });

  const newUser = new User(body);
  await newUser.save();
  console.log("User created:", newUser);

  res.status(201).send({ message: "User created successfully", data: newUser });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (user) return res.send({ data: user });
  return res.send(NOT_FOUND);
});

module.exports = router;
