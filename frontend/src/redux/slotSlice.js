import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../api/apiService";

// Async thunk to fetch available slots
export const fetchAvailableSlots = createAsyncThunk(
  "availableSlots/fetchAvailableSlots",
  async ({ doctorId, date ,duration}) => {
    const response = await apiService.getAvailableSlots(doctorId, date,duration);
    return response;
  }
);

const initialState = {
  availableSlots: [],
  loading: false,
  error: null,
};

const slotSlice = createSlice({
  name: "availableSlots",
  initialState,
  reducers: {resetSlots: () => initialState},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload.availableSlots;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetSlots } = slotSlice.actions;

export default slotSlice.reducer;
