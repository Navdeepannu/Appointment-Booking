import React from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useContext } from "react";
import { useEffect } from "react";

import { LiaUserInjuredSolid } from "react-icons/lia";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdCancel, MdCheckCircle, MdDone } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment } =
    useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

 
  return (
    dashData && (
      <div className="m-5">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md h-24">
            <LiaUserInjuredSolid className="text-4xl text-rose-400 mr-3" />
            <p className="text-lg font-semibold">
              {dashData.patients} Patients
            </p>
          </div>

          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md h-24">
            <AiOutlineSchedule className="text-4xl text-secondary mr-3" />
            <p className="text-lg font-semibold">
              {dashData.appointments} Appointments
            </p>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold mb-3">Latest Appointments</p>

          {dashData.latestAppointments.length === 0 ? (
            <p className="text-center text-rose-400">
              No appointments booked yet.
            </p>
          ) : (
            <div className="divide-y divide-gray-200">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg"
                >
                  {/* patient's Info */}
                  <img
                    src={item.userData.image}
                    alt="Patient Image"
                    className="w-12 h-12 rounded-full object-cover bg-gray-300"
                  />

                  {/* Patient Info */}
                  <div className="flex-1 ml-4">
                    <p className="font-medium text-gray-900">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {slotDateFormat(item.slotDate)} - {item.slotTime}
                    </p>
                  </div>

                  {/* Cancel Button */}
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
                  {item.isCompleted && (
                    <p className="text-green-600 items-center flex gap-1">
                      <MdCheckCircle size={20} /> Completed
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
