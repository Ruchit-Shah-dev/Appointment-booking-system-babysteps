import axios from "axios";

const API_BASE_URL = "http://localhost:8082"; // Change this if your backend URL is different

const apiService = {
  // Get all doctors
  getDoctors: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  },

  //  Get available slots for a specific doctor & date
  getAvailableSlots: async (doctorId, date,duration) => {
    try {
      // console.log(doctorId, date,duration)
      const response = await axios.get(
        `${API_BASE_URL}/doctors/${doctorId}/slots?date=${date}`, {
          headers: { "X-Appointment-Duration": duration }
    });
    // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      throw error;
    }
  },

  //  Book an appointment
  bookAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
      return response.data;
    } catch (error) {
      console.error("Error booking appointment:", error);
      throw error;
    }
  },

  //  Modify an appointment
  updateAppointment: async (appointmentId, updatedData) => {
    try {
      // console.log(updatedData,appointmentId,"tirth")
      const response = await axios.put(
        `${API_BASE_URL}/appointments/${appointmentId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating appointment:", error);
      throw error;
    }
  },

  //  Cancel an appointment
  deleteAppointment: async (appointmentId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  },

  // find and get one appointment
getOneAppointments: async (appointmentId) => {
  try {
    // console.log(appointmentId)
    const response = await axios.get(`${API_BASE_URL}/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
},
};



export default apiService;
