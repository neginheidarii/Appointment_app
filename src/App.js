import { useState, useEffect, useCallback } from "react";
import { SlCalender } from "react-icons/sl";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  // search
  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName?.toLowerCase().includes(query?.toLowerCase()) ||
        item.ownerName?.toLowerCase().includes(query?.toLowerCase()) ||
        item.aptNotes?.toLowerCase().includes(query?.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy]?.toLowerCase() < b[sortBy]?.toLowerCase()
        ? -1 * order
        : 1 * order;
    });
  // fetch
  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-4xl mb-3">
        <SlCalender className="inline-block text-red-400 align-top mr-3" />
        Your Appointments
      </h1>

      <AddAppointment 
      onSendAppointment={myAppointment=> setAppointmentList([...appointmentList, myAppointment])}
      // going throught all items to see which is biggest
      lastId={appointmentList.reduce((max, item) => Number(item.id)> max? Number(item.id): max , 0)}
      />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => orderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />

      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={(appointmentId) => {
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointment.id !== appointmentId
                )
              );
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
