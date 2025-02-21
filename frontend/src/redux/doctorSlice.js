import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiService";

// Async thunk to fetch doctors
export const fetchDoctors = createAsyncThunk("doctors/fetchDoctors", async () => {
  const response = await apiService.getDoctors();
  return response;
});

const initialState = {
  listOfDoctors: [],
  selectedDoctor: "",
  loading: false,
  error: null
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload; 
    },
    resetDoctors: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.listOfDoctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDoctor,resetDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
