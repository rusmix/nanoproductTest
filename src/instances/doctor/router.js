const express = require("express");
const { NOT_FOUND } = require("./constants");
const Doctor = require("./model");
const User = require("../user/model");

const router = express.Router();

router.get("/", async (req, res) => {
  const doctors = await Doctor.find({});
  if (doctors.length !== 0) return res.send({ data: doctors });
  return res.send(NOT_FOUND);
});

router.post("/", (req, res) => {
  const newDoctor = req.body;
  console.log("Doctor created:", newDoctor);
  res
    .status(201)
    .send({ message: "Doctor created successfully", data: newDoctor });
});

router.get("/:id", async (req, res) => {
  const doctorId = req.params.id;
  const doctor = await Doctor.findOne({ id: doctorId });
  if (doctor) return res.send({ data: doctor });
  return res.status(404).send(NOT_FOUND);
});

router.post("/visit", async (req, res) => {
  const visit = req.body;
  console.log(req.body);

  const doctorId = visit.doctor_id;
  const userId = visit.user_id;
  const timeSlot = visit.slot;

  const doctor = await Doctor.findOne({ id: doctorId });
  const user = await User.findOne({ id: userId });

  if (!doctor) return res.status(404).send({ error: NOT_FOUND });

  const slotIndex = doctor.slots.findIndex((el) => {
    el.time === timeSlot;
  });
  const slot = doctor[slotIndex];

  if (!slot.isFree) return res.status(409).send({ error: "Slot is not free" });

  doctor[slotIndex].client = userId;
  doctor[slotIndex].isFree = false;
  await doctor.save();

  user.futureSlots.push({ time: timeSlot, doctor: doctorId });
  await user.save();

  return res.send({ message: "Slot is reserved" });
});

module.exports = router;
