const express = require("express");
const mongoConnect = require("./helpers/mongo");
const usersRouter = require('./instances/user/router');

require('dotenv').config();

const App = async () => {
  const app = express();
  await mongoConnect();
  app.use(express.json());
  
  app.use('/users', usersRouter);

  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  const port = process.env.PORT;
  const devUrl = process.env.DEV_URL;
  app.listen(port, () => {
    console.log(`Express API is running on ${devUrl}${port}`);
  });
};

App();
