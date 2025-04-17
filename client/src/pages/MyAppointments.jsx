import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { MdCancel, MdDone } from "react-icons/md";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  // format the date
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // Get appointment data
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse()); // get the latest appointemnt on top using reverse()
        console.log(data.appointments);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // update user appointment data
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <ToastContainer />
      <div className="mt-6">
        {appointments.length === 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl text-gray-500 font-light">
              Your appointment list is empty. Plan ahead and book now!
            </p>
            <button
              onClick={() => navigate("/doctors")}
              className="bg-secondary text-white px-4 py-2 rounded-full hover:-translate-y-1 duration-400 transition-all cursor-pointer"
            >
              Book now
            </button>
          </div>
        )}

        {appointments &&
          appointments.map((doctor, index) => (
            <div
              key={index}
              className="flex justify-between items-start gap-8 md:flex-row sm:flex-col transition-all duration-300 rounded-md border border-gray-200 shadow-xl p-4 mt-4"
            >
              <div className="flex md:flex-row gap-6">
                <img
                  src={doctor.docData.image}
                  alt="doctor_image"
                  className="w-40 rounded-md bg-blue-50"
                />
                <div>
                  <p className="text-2xl text-gray-800 font-normal">
                    {doctor.name}
                  </p>
                  <p className="text-md text-gray-700">
                    {doctor.docData.speciality}
                  </p>

                  <p className="text-sm text-neutral-500 font-light mt-2">
                    {doctor.docData.address.line1}
                  </p>
                  <p className="text-sm text-neutral-500 font-light">
                    {doctor.docData.address.line2}
                  </p>
                  <p className="text-sm text-neutral-500 font-light mt-2">
                    <span className="text-black text-sm">Date & Time: </span>
                    {slotDateFormat(doctor.slotDate)} | {doctor.slotTime}
                  </p>
                </div>
              </div>
              <div className="cursor-pointer">
                {!doctor.cancelled && !doctor.isCompleted && (
                  <button
                    className="text-rose-700 p-2 rounded-md hover:bg-rose-700 hover:text-white duration-400 transition-all tracking-wide cursor-pointer border font-light"
                    onClick={() => cancelAppointment(doctor._id)}
                  >
                    Cancel Appointment
                  </button>
                )}
                {doctor.cancelled && !doctor.isCompleted && (
                  <button className="bg-rose-700 text-gray-100 rounded-lg p-2 cursor-not-allowed flex items-center gap-1">
                    Cancelled <MdCancel size={20} />
                  </button>
                )}
                {doctor.isCompleted && (
                  <button className="text-gray-700 rounded-lg p-2 cursor-not-allowed border border-green-600 flex items-center gap-1">
                    Completed{" "}
                    <MdDone
                      size={20}
                      className="rounded-full px-0.5 text-white bg-green-600"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
