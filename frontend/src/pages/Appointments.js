import React, { useState } from "react";
import AppointmentList from "../components/AppointmentList";
import EditAppointmentModal from "../components/EditAppointmentModal";
import "../styles/Appointments.css"

const Appointments = () => {
  // const dispatch = useDispatch();
  // const { appointments } = useSelector((state) => state.appointment);

  const [editingAppointment, setEditingAppointment] = useState(false);

  const handleEdit = () => {
    setEditingAppointment(true);
  };

  // const handleUpdate = (updatedAppointment) => {
  //   dispatch(updateAppointment(updatedAppointment));
  //   setEditingAppointment(null);
  // };

  

  return (
    <div className="appointments-container">
      <h1 className="appointments-title">Appointments</h1>
      <AppointmentList onEdit={handleEdit} />

      {editingAppointment && (
        <EditAppointmentModal
        open={editingAppointment}
          onClose={() => setEditingAppointment(false)}
        />
      )}
    </div>
  );
};

export default Appointments;
