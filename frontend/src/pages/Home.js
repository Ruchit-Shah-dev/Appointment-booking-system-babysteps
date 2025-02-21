import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../redux/doctorSlice";
import { fetchAvailableSlots } from "../redux/slotSlice";
import DoctorSelect from "../components/DoctorSelect";
import AppointmentFilters from "../components/AppointmentFilters";
import AvailableSlots from "../components/AvailableSlots";
import BookingModal from "../components/BookingModal";
import "../styles/Home.css"

const Home = () => {
  const dispatch = useDispatch();
 
  const doctors = useSelector((state) => state.doctors.listOfDoctors);
  const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);
  const availableSlots = useSelector((state) => state.slots.availableSlots);
  const loadingSlots = useSelector((state) => state.slots.loading);
  const selectedDate = useSelector((state) => state.appointments.selectedDate);
  const selectedDuration = useSelector((state) => state.appointments.selectedDuration);

  const [selectedSlot, setSelectedSlot] = useState(null); // Centralized state

  const onSlotClick = (slot) => {
    setSelectedSlot(slot); // Open modal when a slot is clicked
  };

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchDoctors());
    }
    // console.log(doctors)
  }, [dispatch, doctors.length]);

  const handleFetchSlots = () => {
    // console.log(selectedDuration)
    if (!selectedDoctor || !selectedDate || !selectedDuration) {
      alert("Please select all required fields!");
      return;
    }
    dispatch(fetchAvailableSlots({ doctorId: selectedDoctor._id, date: selectedDate ,duration:selectedDuration}));
  };
  
//  console.log(availableSlots,loadingSlots,"abc")

  return (
    <div className="home-container">
      <h2>Book an Appointment</h2>

      <DoctorSelect  />
      
      {selectedDoctor !== "" && <AppointmentFilters handleFetchSlots={handleFetchSlots}/>}

      {loadingSlots && <p className="loading-message">Loading available slots...</p>}

      {availableSlots.length > 0 && !loadingSlots && (
        <div className="available-slots"> 
        <AvailableSlots onSlotClick={onSlotClick} />
      </div>
      )}

      {selectedSlot && (
        <BookingModal
          selectedSlot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
        />
      )}
    </div>
  );
};

export default Home;
