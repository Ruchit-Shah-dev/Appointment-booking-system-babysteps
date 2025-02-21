Doctor Appointment Booking System (MERN Stack)

A MERN stack application that allows users to book and manage doctor appointments efficiently.

🚀 Features
✅ Select a doctor and book an appointment.
✅ View available slots based on doctor's schedule.
✅ Modify or cancel appointments.
✅ Fully responsive and user-friendly UI.

🛠️ Tech Stack
Frontend: React, React Router, Material UI
Backend: Node.js, Express.js, MongoDB
State Management: React state (no Redux used)
Database: MongoDB with Mongoose
Deployment: TBD

🎯 Getting Started

1. Clone the Repository
git clone https://github.com/Ruchit-Shah-dev/Appointment-booking-system-babysteps.git
cd Appointment-booking-system-babysteps

2.Install Dependencies
For Backend 
cd backend
npm install

For Frontend
cd frontend
npm install

Running the Application

1. Start the Backend Server
cd backend
npm start
This will start the backend at http://localhost:8082

2. Start the Frontend
cd frontend
npm start
This will run the frontend at http://localhost:3000

Environment Variables
Create a .env file inside the backend folder with the following:
MONGO_URI=your_mongodb_connection_string
PORT=5000


📌 API Endpoints

👨‍⚕️ Doctor Routes
GET	/doctors	                        Get all doctors
GET	/doctors/:id/slots?date=YYYY-MM-DD	Get available slots for a doctor

📅 Appointment Routes

GET	/appointments	        Get all appointments
GET	/appointments/:id	    Get a single appointment
POST	/appointments	    Create a new appointment
PUT	/appointments/:id	    Update an appointment
DELETE	/appointments/:id	Cancel an appointment

