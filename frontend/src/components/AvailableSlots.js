import React from "react";
import { useSelector } from "react-redux";

const AvailableSlots = ({onSlotClick}) => {
  // console.log("hiiiii")
  const availableSlots = useSelector((state) => state.slots.availableSlots);
  // console.log("ruchit",availableSlots)
  const loading = useSelector((state) => state.slots.loading);
  const error = useSelector((state) => state.slots.error);

  return (
    <div className="available-slots-container">
      <h3 className="available-slots-title">Available Slots</h3>
      {loading && <p lassName="loading-text">Loading slots...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && availableSlots.length === 0 && <p className="no-slots-text">No slots available.</p>}

      <div className="slots-container">
        {availableSlots.map((slot, index) => (
          <button key={index} className="slot-button" onClick={() => onSlotClick(slot)}>
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;
