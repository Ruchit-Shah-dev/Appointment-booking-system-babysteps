import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate, setSelectedDuration } from "../redux/appointmentSlice";
import "../styles/AppointmentFilters.css"
import getNext7Days from "../utils/getNext7Days";

const AppointmentFilters = ({handleFetchSlots}) => {

    const dispatch = useDispatch();
  
    // Access Redux state
    const selectedDate = useSelector((state) => state.appointments.selectedDate);
    const selectedDuration = useSelector((state) => state.appointments.selectedDuration);
    
  return (
    <div className="appointment-filters-container">
      <div className="filter-group">
      <label className="filter-label">Select Date:</label>
      <input className="date-input" type="date" value={selectedDate}  min={getNext7Days()[0]} max={getNext7Days()[6]}  onChange={(e) => dispatch(setSelectedDate(e.target.value))} />
      </div>

      <div className="filter-group">
      <label className="filter-label">Select Duration:</label>
      <select className="duration-select" value={selectedDuration} onChange={(e) => dispatch(setSelectedDuration(Number(e.target.value)))}>
        <option value={30}>30 Minutes</option>
        <option value={60}>60 Minutes</option>
      </select>
      </div>

      <button className="check-availability-button"onClick={handleFetchSlots}>Check Availability</button>
    
    </div>
  );
};

export default AppointmentFilters;
