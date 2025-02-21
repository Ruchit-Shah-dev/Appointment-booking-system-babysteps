const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const seedDatabase = require("./seed")

require("dotenv").config();

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  mongoose.connection.once("open", async () => {
    console.log("✅ Connected to MongoDB");
  
    // Call the seeding function before starting the server
    await seedDatabase();
  })

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

app.use((err, req, res, next) => {
  console.error("Error Details:", {
    message: err.message,
    stack: err.stack,
    status: err.status || 500
  }); // Log the error
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    details: err.details || "No additional details provided."
  });
});


const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
