const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  //TODO
});

router.post("/", (req, res) => {
  const newUser = req.body;
  console.log("User created:", newUser);
  res.status(201).send({ message: "User created successfully", data: newUser });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send()
});

// Export the router instance so it can be used in other files
module.exports = router;
