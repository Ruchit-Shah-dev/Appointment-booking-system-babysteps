import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedDoctor} from "../redux/doctorSlice"
import "../styles/DoctorSelect.css"

const DoctorSelect = () => {
  const dispatch = useDispatch();
  // const { data: doctors, loading, error } = useSelector((state) => state.doctors);

  const doctors = useSelector((state) => state.doctors.listOfDoctors);
  const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);

  const handleChange = (event) => {
    const doctorId = event.target.value;
    const doctor = doctors.find((doc) => doc._id === doctorId);
    dispatch(setSelectedDoctor(doctor)); // Updates Redux state
    //onNext(); // Moves to the next step (date selection)
  };

  return (
    <div className="doctor-select-container">
      <h2 className="doctor-select-title">Select a Doctor</h2>
      <select className="doctor-select-dropdown" value={selectedDoctor?._id || ""} onChange={handleChange}>
        <option value="" disabled>Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>
    </div>
  );
};


export default DoctorSelect;
