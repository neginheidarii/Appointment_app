import { useState, useEffect, useCallback } from "react";
import { SlCalender } from "react-icons/sl";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import appointmentList from "./data.json"
import AppointmentInfo from "./components/AppointmentInfo"

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-4xl mb-3">
        <SlCalender className="inline-block text-red-400 align-top mr-3" />
        Your Appointments
      </h1>

      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        {appointmentList.map((appointment) => (
         <AppointmentInfo key={appointment.id}
         appointment={appointment}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
