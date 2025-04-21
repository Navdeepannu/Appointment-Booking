import { useContext } from "react";

import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointment from "./pages/admin/AllAppointment";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorList from "./pages/admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorProfile from "./pages/doctors/DoctorProfile";
import DoctorDashboard from "./pages/doctors/DoctorDashboard";
import DoctorAppointments from "./pages/doctors/DoctorAppointments";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (aToken) {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        <div className="flex flex-start bg-[#f3f6fb]">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
          </Routes>
        </div>
      </div>
    );
  }

  if (dToken) {
    return (
      <div>
        <ToastContainer />
        <Navbar />
        <div className="flex flex-start bg-[#f3f6fb]">
          <Sidebar />
          <Routes>
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/appointments" element={<DoctorAppointments />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
