const express = require("express");
const { NOT_FOUND } = require("./constants");
const Doctor = require("./model");
const User = require("../user/model");
const setNotification = require("../functions");
const router = express.Router();

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  if (doctors.length !== 0) return res.send({ data: doctors });
  return res.send(NOT_FOUND);
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.name || !body.phone || !body.spec)
    //TODO: phone validation :)
    return res.status(400).send({ message: "invalid data" });

  const newDoc = new Doctor(body);
  await newDoc.save();
  console.log("Doc created:", newDoc);

  res.status(201).send({ message: "Doc created successfully", data: newDoc });
});

router.post("/:id/slot", async (req, res) => {
  const slotTime = req.body.time;
  const doctorId = req.params.id;

  const doctor = await Doctor.findOne({ _id: doctorId });
  if (!doctor) return res.status(400).send({ error: NOT_FOUND });

  doctor.slots.push({ time: slotTime });
  await doctor.save();

  res.status(201).send({ message: "Slot created successfully", data: doctor });
});

router.get("/:id", async (req, res) => {
  const doctorId = req.params.id;
  const doctor = await Doctor.findOne({ _id: doctorId });
  if (doctor) return res.send({ data: doctor });
  return res.status(404).send(NOT_FOUND);
});

router.post("/visit", async (req, res) => {
  const visit = req.body;
  console.log(req.body);

  const doctorId = visit.doctor_id;
  const userId = visit.user_id;
  const timeSlot = visit.slot;

  const doctor = await Doctor.findOne({ _id: doctorId });
  const user = await User.findOne({ _id: userId });

  if (!doctor) return res.status(404).send({ error: "doctor not found" });

  const slotIndex = doctor.slots.findIndex(
    (el) => new Date(el.time).getTime() === new Date(timeSlot).getTime()
  );
  console.log(slotIndex);

  const slot = doctor.slots[slotIndex];

  if (!slot) return res.status(404).send({ error: "slot not found" });
  if (!slot.isFree) return res.status(409).send({ error: "Slot is not free" });

  doctor.slots[slotIndex].client = userId;
  doctor.slots[slotIndex].isFree = false;
  await doctor.save();

  user.futureSlots.push({ time: timeSlot, doctor: doctorId });
  await user.save();

  setNotification(doctor.slots[slotIndex], doctor);
  return res.send({ message: "Slot is reserved successfully" });
});

module.exports = router;
