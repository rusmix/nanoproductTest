const express = require("express");
const { NOT_FOUND } = require("./constants");
const Doctor = require("./model");

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

  if (!doctor) return res.status(404).send({ error: NOT_FOUND });

  const slot = doctor.slots.find((el) => {
    el.time === timeSlot;
  });

  if(!slot.isFree)

  res.send({ message: "TEST" });
});

module.exports = router;
