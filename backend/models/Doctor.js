const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workingHours: {
    start: { type: String, default: "09:00", immutable: true ,required: true},
  end: { type: String, default: "17:00", immutable: true ,required: true}
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);