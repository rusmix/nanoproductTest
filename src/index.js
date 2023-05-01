const express = require("express");
const mongoConnect = require("./helpers/mongo");
const usersRouter = require("./instances/user/router");
const { USER_PATH } = require("./instances/user/constants");
const doctorsRouter = require("./instances/doctor/router");
const { DOCTOR_PATH } = require("./instances/doctor/constants");

require("dotenv").config();

const App = async () => {
  const app = express();
  await mongoConnect();
  app.use(express.json());

  app.use(USER_PATH, usersRouter);
  app.use(DOCTOR_PATH, doctorsRouter);

  app.get("/", (req, res) => {
    res.send("Hello world I am the service for clients and doctors");
  });

  const port = process.env.PORT;
  const devUrl = process.env.DEV_URL;
  app.listen(port, () => {
    console.log(`Express API is running on ${devUrl}${port}`);
  });
};

App();
