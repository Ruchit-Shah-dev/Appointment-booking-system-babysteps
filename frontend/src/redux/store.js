import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./doctorSlice";
import slotReducer from "./slotSlice"
import appointmentReducer from "./appointmentSlice";

const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    slots: slotReducer,
    appointments: appointmentReducer,
  },
});

export default store;
