const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    enum: [30, 60], // Fixed slot durations
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
