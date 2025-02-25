import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
