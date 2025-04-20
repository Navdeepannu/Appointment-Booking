import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";

import { MdCancel, MdDone, MdCheckCircle } from "react-icons/md";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
      console.log(appointments);
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Data & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-1 text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_2fr] text-gray-500 items-center py-3 px-6 border-b border-gray-300 hover:bg-gray-50"
          >
            <p>{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img src={item.userData.image} className="w-8 h-8 rounded-full" />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>${item.docData.fees}</p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Cancelled status */}
              {item.cancelled ? (
                <p className="text-rose-500 flex items-center gap-1">
                  <MdCancel size={20} /> Cancelled
                </p>
              ) : (
                !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition cursor-pointer"
                  >
                    <MdCancel size={20} /> Cancel
                  </button>
                )
              )}

              {/* Completed status */}
              {item.isCompleted ? (
                <p className="text-green-600 items-center flex gap-1">
                  <MdCheckCircle size={20} /> Completed
                </p>
              ) : (
                !item.cancelled && (
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full cursor-pointer hover:bg-green-200 transition"
                  >
                    <MdDone size={20} />
                    Mark as Done
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
