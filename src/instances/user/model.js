const mongoose = require("mongoose");
const { USER_COLLECTION_NAME } = require("./constants");

const user = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model(USER_COLLECTION_NAME, user);
module.exports = User;
