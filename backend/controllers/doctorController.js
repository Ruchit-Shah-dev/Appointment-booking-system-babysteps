const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const {  addMinutes } = require("date-fns");


//  Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    next({ status: 500, message: "Failed to fetch doctors", details: error.message });
  }
};

//  Get available slots for a doctor on a specific date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    const duration = req.headers["x-appointment-duration"];
    console.log(id,date,duration)
    if (!date || !duration) {
      return res.status(400).json({ error: "Date and duration are required." });
    }
    // console.log("ruchit")
    // Fetch doctor details
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }
    // console.log("tirth")
    const { start: startTime, end: endTime } = doctor.workingHours;
    // console.log("hello")
    // Fetch existing appointments for the given date

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Start of the day at 00:00:00 UTC

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // End of the day at 23:59:59 UTC

    const existingAppointments = await Appointment.find({
      doctorId: id,
      date: {
        $gte: startOfDay, // Greater than or equal to start of the day
        $lte: endOfDay,   // Less than or equal to end of the day
      }
    });
    // console.log("hii")
    // Convert working hours into actual Date objects
    const workingStart = new Date(`${date}T${startTime}:00.000Z`); // UTC
    const workingEnd = new Date(`${date}T${endTime}:00.000Z`); // UTC
    // console.log("Working Start & End:", workingStart.toISOString(), workingEnd.toISOString());

let slots = [];
let slotTime = new Date(workingStart); // Clone start time

// Generate slots in UTC
while (slotTime < workingEnd) {
  slots.push(new Date(slotTime.toISOString())); // Store in UTC
  slotTime = addMinutes(slotTime, Number(duration));
}

// console.log("Generated Slots in UTC:", slots.map((s) => s.toISOString()));

// console.log("Existing Appointments:", existingAppointments);


    // Remove conflicting slots based on existing appointments
    const availableSlots = slots.filter((slot) => {
      return !existingAppointments.some((appointment) => {
        const appointmentStart = new Date(appointment.date); // This is in UTC
        const appointmentEnd = addMinutes(appointmentStart, appointment.duration);

         // Compute the end time of the current slot (based on requested duration)
    const slotEnd = addMinutes(slot, duration);
    
        // console.log("Checking Slot:", slot.toISOString(), "against", appointmentStart.toISOString(), "-", appointmentEnd.toISOString());
        return (
          (slot >= appointmentStart && slot < appointmentEnd) || // Slot starts inside an appointment
          (slotEnd > appointmentStart && slotEnd <= appointmentEnd) || // Slot ends inside an appointment
          (slot <= appointmentStart && slotEnd >= appointmentEnd) // Slot fully covers an appointment
        );
      });
    });
    
    // console.log("Available Slots:", availableSlots.map((s) => s.toISOString()));

    res.status(200).json({
      doctorId: id,
      date,
      duration,
      availableSlots: availableSlots.map((slot) => slot.toISOString().substring(11, 16)),
    });

  } catch (error) {
    console.error("Error fetching available slots:", error);
    next({ status: 500, message: "Failed to fetch available slots", details: error.message });
  }
};
