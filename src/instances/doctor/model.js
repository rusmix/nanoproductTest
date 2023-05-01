const mongoose = require("mongoose");
const { DOCTOR_COLLECTION_NAME } = require("./constants");

const doctor = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  spec: { type: String, required: true },
  slots: {
    type: [
      {
        time: Date,
        isFree: { type: Boolean, default: true },
        client: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
});

const Doctor = mongoose.model(DOCTOR_COLLECTION_NAME, doctor);
module.exports = Doctor;
