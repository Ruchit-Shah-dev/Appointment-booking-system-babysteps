import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiService";

// Fetch One appointments
export const fetchOneAppointments = createAsyncThunk("appointments/fetchOneAppointments", async (appointmentId) => {
  const response = await apiService.getOneAppointments(appointmentId);
  return response;
});

// Book an appointment
export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async (appointmentData) => {
    const response = await apiService.bookAppointment(appointmentData);
    return response;
  }
);

// Modify an appointment
export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ appointmentId, updatedData }) => {
    // console.log(updatedData,"ruchit")
    const response = await apiService.updateAppointment(appointmentId, updatedData);
    return response;
  }
);

// Delete an appointment
export const deleteAppointment = createAsyncThunk("appointments/deleteAppointment", async (appointmentId) => {
  const response = await apiService.deleteAppointment(appointmentId);
  return response;
});

const initialState = { selectedDate: "",
  selectedDuration: 30,
  doctorId: "",
  id:"",
  patientName:"",
  appointmentType:"",
  notes:"",
  loading: false, error: null}

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
    resetAppointments: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneAppointments.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.id = action.payload._id || ""
          state.doctorId = action.payload.doctorId || "" 
          state.selectedDate = action.payload.date || "";
          state.selectedDuration = action.payload.duration || 30;
          state.patientName = action.payload.patientName || "";
          state.appointmentType = action.payload.appointmentType || "";
          state.notes = action.payload.notes || "";
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOneAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        // console.log("Received Data:", action.payload); 

        if (action.payload) {
          
          state.id = action.payload._id || ""
          state.doctorId = action.payload.doctorId || "" 
          state.selectedDate = action.payload.date || "";
          state.selectedDuration = action.payload.duration || 30;
          state.patientName = action.payload.patientName || "";
          state.appointmentType = action.payload.appointmentType || "";
          state.notes = action.payload.notes || "";
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        if (action.payload) {
          
          state.id = action.payload._id || ""
          state.doctorId = action.payload.doctorId || "" 
          state.selectedDate = action.payload.date || "";
          state.selectedDuration = action.payload.duration || 30;
          state.patientName = action.payload.patientName || "";
          state.appointmentType = action.payload.appointmentType || "";
          state.notes = action.payload.notes || "";
        }
        
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        
      });
  },
});

export const { setSelectedDate, setSelectedDuration,resetAppointments} = appointmentSlice.actions;

export default appointmentSlice.reducer;
