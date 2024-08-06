import { SlCalender } from "react-icons/sl";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-4xl">
        <SlCalender className="inline-block text-red-400 align-top mr-3" />
        Your Appointments
      </h1>

      <Search />
      <AddAppointment />
    </div>
  );
}

export default App;
