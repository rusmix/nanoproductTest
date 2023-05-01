const mongoose = require("mongoose");
const { USER_COLLECTION_NAME } = require("./constants");

const user = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  futureSlots: {
    type: [
      {
        time: Date,
        doctor: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
});

const User = mongoose.model(USER_COLLECTION_NAME, user);
module.exports = User;
