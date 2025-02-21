import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../redux/appointmentSlice"; // Redux action
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import "../styles/BookingModal.css"

const BookingModal = ({ selectedSlot, onClose}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Get required data from Redux
const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);
const selectedDate = useSelector((state) => state.appointments.selectedDate);
const selectedDuration = useSelector((state) => state.appointments.selectedDuration);
// console.log(selectedSlot,selectedDate,selectedDoctor._id)
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName.trim()) {
      alert("Patient Name is required!");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(patientName)) {
      alert("Patient Name should only contain letters.");
      return;
    }
    if (!appointmentType.trim()) {
      alert("Please enter an appointment type.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a slot before confirming.");
      return;
    }

    const dateTimeString = `${selectedDate}T${selectedSlot}:00.000Z`;
    const date = new Date(dateTimeString);
    
    const appointmentData = {
      doctorId: selectedDoctor._id,  // From Doctor Slice
      date: date,           // From Appointments Slice
      duration: selectedDuration,   // From Appointments Slice
      appointmentType,
      patientName,
      notes,
    };

    try {
      await dispatch(bookAppointment(appointmentData)).unwrap();
  
      alert("Appointment successfully booked! ✅");
  
      // Close modal after submitting
      onClose();
      navigate("/appointments"); // Redirect to appointments page
    } catch (error) {
      
      alert(`Failed to book appointment: ${error.message}`);
    }
  }

  return (
    <Modal open={!!selectedSlot} onClose={onClose} className="modal">
      <Box className="modal-content">
        <Typography variant="h5" className="modal-title">
          Book Appointment - {selectedSlot}
        </Typography>

        <TextField
          label="Patient Name"
          fullWidth
          required
          variant="outlined"
          className="modal-input"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <TextField
          label="Appointment Type"
          fullWidth
          required
          variant="outlined"
          className="modal-input"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
        />

        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          className="modal-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="modal-buttons">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm Appointment
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BookingModal;
