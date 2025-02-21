import React, { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { fetchOneAppointments ,deleteAppointment , resetAppointments} from "../redux/appointmentSlice";
import { useNavigate } from "react-router-dom";
import { resetDoctors } from "../redux/doctorSlice";
import { resetSlots } from "../redux/slotSlice";
import "../styles/AppointmentList.css"
const AppointmentList = ({ onEdit }) => {

  const  appointments  = useSelector((state) => state.appointments);
  // console.log(appointments)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointments._id) {
    dispatch(fetchOneAppointments(appointments._id));
    }
  },[appointments._id, dispatch])
  
  const handleCancel = async (appointmentId) => {
    // console.log(appointmentId)
    if (!appointmentId) {
      alert("Invalid appointment ID!");
      return;
    }
    try {
      await dispatch(deleteAppointment(appointmentId)).unwrap();
      alert("Appointment successfully deleted!"); // Show notification on success
      dispatch(resetDoctors());
      dispatch(resetAppointments());
      dispatch(resetSlots());
      navigate("/");
    } catch (error) {
      alert(`Failed to delete appointment: ${error.message}`); //  Show error message
    }
  };

  // console.log(new Date(appointments.selectedDate))
  // let abc=new Date(appointments.selectedDate).toISOString()
  // console.log(appointments.selectedDate)

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
      timeZone: 'UTC' // Ensures no timezone conversion
    }).format(date).replace(',', '');
  };

  // console.log(formattedDate);  

  
  return (
    <div className="appointment-list-container">
      <h2 className="appointment-list-title">Your Appointments</h2>
      {appointments.doctorId !== "" ? (
             <div className="appointment-card">
              <p>
              <strong>Patient Name:</strong> {appointments.patientName} |
              <strong>Date:</strong> {formatDate(appointments.selectedDate)} |
              <strong>Duration:</strong> {appointments.selectedDuration} mins  
              </p>
              <div className="appointment-buttons">
              <button className="edit-btn" onClick={() => onEdit()}>Edit</button>
              <button className="cancel-btn" onClick={() => handleCancel(appointments.id)}>Cancel</button>
              </div>
              </div>
      ): (
        <p className="no-appointment">No upcoming appointments.</p>
      )}
    </div>
  );
};

export default AppointmentList;
