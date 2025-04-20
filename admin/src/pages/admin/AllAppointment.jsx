import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

import { MdOutlineCancel } from "react-icons/md";

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Data & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 items-center py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="userImage"
                className="rounded-full w-10"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                className="rounded-full w-10 bg-gray-200"
              />
              <p>{item.docData.name}</p>
            </div>
            <p>${item.docData.fees}</p>

            {/*  cancel button */}
            {item.cancelled ? (
              <p className="text-rose-400 font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-600 font-semibold">Completed</p>
            ) : (
              <button onClick={() => cancelAppointment(item._id)}>
                <MdOutlineCancel className="text-2xl cursor-pointer text-rose-700" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
