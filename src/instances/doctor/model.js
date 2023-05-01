const mongoose = require("mongoose");
const { DOCTOR_COLLECTION_NAME } = require("./constants");

const doctor = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  spec: { type: String, required: true },
  slots: {
    type: [
      {
        _id: false,
        time: Date,
        isFree: { type: Boolean, default: true },
        client: { type: mongoose.Schema.Types.ObjectId, default: null },
      },
    ],
    default: [],
  },
});

const Doctor = mongoose.model(DOCTOR_COLLECTION_NAME, doctor);
module.exports = Doctor;
