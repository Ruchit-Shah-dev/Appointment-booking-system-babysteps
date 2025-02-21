import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableSlots } from "../redux/slotSlice";
import { updateAppointment } from "../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";
import getNext7Days from "../utils/getNext7Days";
import { Modal, Box, Typography, TextField, MenuItem, Button, CircularProgress, Grid,} from "@mui/material";


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const EditAppointmentModal = ({open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


   // Redux states
   const availableSlots = useSelector((state) => state.slots.availableSlots);
   const loading = useSelector((state) => state.slots.loading);
   const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);
   const  appointments  = useSelector((state) => state.appointments);
  //  console.log(appointments, "yes")


   const [date, setDate] = useState("");
   const [duration, setDuration] = useState(30);
   const [selectedSlot, setSelectedSlot] = useState(null);
   const [slotsFetched, setSlotsFetched] = useState(false); // Track if slots were fetched


   const handleFetchSlots = () => {
    if ( !date || !duration) {
          alert("Please select all required fields!");
          return;
        }
       
        dispatch(fetchAvailableSlots({ doctorId: selectedDoctor._id, date: date, duration:duration }));
        setSlotsFetched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert("Please select a slot before submitting.");
      return;
    }

    const dateTimeString = `${date}T${selectedSlot}:00.000Z`;
    const formattedDate = new Date(dateTimeString);

    const updatedData = {
      doctorId:appointments.doctorId,
      date: formattedDate,
      duration: duration,
      appointmentType:appointments.appointmentType,
      patientName:appointments.patientName,
      notes:appointments.notes,
    };
    const appointmentId = appointments.id
    // console.log(appointmentId,updatedData, "neha")

    try {
      await dispatch(updateAppointment({ appointmentId, updatedData })).unwrap();
  
      
      alert("Appointment successfully updated! ✅");
  
      // Close modal and navigate
      onClose();
      navigate("/appointments"); // Redirect to appointments page
    } catch (error) {
      alert(`Failed to update appointment: ${error.message}`);
    }
    
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-appointment-modal">
      <Box sx={modalStyle}>
        <Typography id="edit-appointment-modal" variant="h6" component="h2" mb={2}>
          Edit Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Select Date */}
          <TextField
            label="Select Date"
            type="date"
            fullWidth
            value={date}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: getNext7Days()[0],
              max: getNext7Days()[6],
            }}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Select Duration */}
          <TextField
            select
            label="Select Duration"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            sx={{ mb: 2 }}
          >
            <MenuItem value={30}>30 Minutes</MenuItem>
            <MenuItem value={60}>60 Minutes</MenuItem>
          </TextField>

          {/* Fetch Available Slots */}
          <Button variant="contained" fullWidth onClick={handleFetchSlots} sx={{ mb: 2 }}>
            Check Availability
          </Button>

          {/* Available Slots */}
          {slotsFetched && (
            <>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Select New Slot:
              </Typography>
              {loading ? (
                <CircularProgress size={24} />
              ) : availableSlots.length > 0 ? (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {availableSlots.map((slot, index) => (
                    <Grid item xs={6} key={index}>
                      <Button
                        variant={selectedSlot === slot ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="error">No slots available</Typography>
              )}
            </>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Update Appointment
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
            Close
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAppointmentModal;











  