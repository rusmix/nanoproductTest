const express = require("express");
const { mongoConnect } = require("./helpers/mongo");

const app = express();

app.use(express.json());
await mongoConnect();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  console.log("User created:", newUser);
  res.status(201).send({ message: "User created successfully", data: newUser });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Express API is running on http://localhost:${port}`);
});
