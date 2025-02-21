const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");



const seedDatabase = async () => {

  try {
    //  Delete previous data**
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log("🗑️ Deleted previous doctors & appointments");

    //  Seed new doctors**
    const doctorsData = [
      { name: "Dr. Alice Johnson", workingHours: { start: "09:00", end: "17:00" } },
      { name: "Dr. Bob Smith", workingHours: { start: "09:00", end: "17:00" } },
      { name: "Dr. Charlie Davis", workingHours: { start: "09:00", end: "17:00" } },
      { name: "Dr. Diana Wilson", workingHours: { start: "09:00", end: "17:00" } },
    ];

    const doctors = await Doctor.insertMany(doctorsData);
    console.log("✅ Doctors seeded!");

    //  Seed mock appointments**
    const mockAppointments = [
      {
        doctorId: doctors[0]._id,
        date: new Date("2025-02-21T10:00:00Z"),
        duration: 30,
        appointmentType: "Routine Check-Up",
        patientName: "Alice Johnson",
        notes: "Needs blood pressure check",
      },
      {
        doctorId: doctors[1]._id,
        date: new Date("2025-02-22T11:00:00Z"),
        duration: 60,
        appointmentType: "Ultrasound",
        patientName: "Bob Smith",
        notes: "Pregnancy scan",
      },
      {
        doctorId: doctors[2]._id,
        date: new Date("2025-02-23T09:30:00Z"),
        duration: 30,
        appointmentType: "Consultation",
        patientName: "Charlie Davis",
        notes: "Discuss chronic pain",
      },
      {
        doctorId: doctors[0]._id,
        date: new Date("2025-02-24T12:30:00Z"),
        duration: 60,
        appointmentType: "Routine Check-Up",
        patientName: "Diana Wilson",
        notes: "Annual physical examination",
      },
    ];

    await Appointment.insertMany(mockAppointments);
    console.log("✅ Appointments seeded!");

  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } 
};

module.exports = seedDatabase; 
