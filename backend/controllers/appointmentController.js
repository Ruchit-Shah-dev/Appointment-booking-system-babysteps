const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");
// GET all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

// GET a single appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    res.json(appointment);
  } catch (error) {
    next({ status: 500, message: "Error fetching appointment", details: error.message });
  }
};

// POST create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
    // console.log({ doctorId, date, duration, appointmentType, patientName, notes })

    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
      return res.status(400).json({ error: "All fields are required." });
    }

  const newAppointment = new Appointment({
  doctorId: new mongoose.Types.ObjectId(doctorId), // Convert to ObjectId
  date: new Date(date).toISOString(), // Ensure date is a valid Date object
  duration: Number(duration), // Ensure duration is a number
  appointmentType,
  patientName,
  notes
});
// console.log(newAppointment)
const savedAppointment = await newAppointment.save();
// console.log("Appointment Saved Successfully:", savedAppointment);
res.status(201).json(savedAppointment);
  } catch (error) {
    // console.error("Error Saving Appointment:", error);
    next({ status: 500, message: "Failed to save appointment", details: error.message });
  }
};

// PUT update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;
    
    // Validate slot availability (excluding the current appointment)
    // const isAvailable = await isSlotAvailable(doctorId, date, duration, req.params.id);
    // if (!isAvailable) return res.status(400).json({ error: "Time slot not available" });

    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id,
  {
    doctorId: new mongoose.Types.ObjectId(doctorId),
    date: new Date(date).toISOString(),
    duration: Number(duration),
    appointmentType,
    patientName,
    notes
  }, 
  { new: true, runValidators: true }
    );
    // console.log(updatedAppointment,"ser")
    if (!updatedAppointment) return res.status(404).json({ error: "Appointment not found" });

    res.json(updatedAppointment);
  } catch (error) {
    next({ status: 500, message: "Error updating appointment", details: error.message });
  }
};

// DELETE an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id,"ruchit")
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) return res.status(404).json({ error: "Appointment not found" });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next({ status: 500, message: "Error deleting appointment", details: error.message });
  }
};
