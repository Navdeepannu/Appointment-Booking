import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

// Icons
import { FaUserDoctor } from "react-icons/fa6";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const Dashboard = () => {
  const { getDashboardData, dashboardData, aToken, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashboardData && (
      <div className="m-5">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md h-24">
            <FaUserDoctor className="text-3xl text-primary mr-3" />
            <p className="text-lg font-semibold">
              {dashboardData.doctors} Doctors
            </p>
          </div>

          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md h-24">
            <LiaUserInjuredSolid className="text-4xl text-rose-400 mr-3" />
            <p className="text-lg font-semibold">
              {dashboardData.patients} Patients
            </p>
          </div>

          <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md h-24">
            <AiOutlineSchedule className="text-4xl text-secondary mr-3" />
            <p className="text-lg font-semibold">
              {dashboardData.appointments} Appointments
            </p>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="mt-6 bg-white shadow-md rounded-lg p-4">
          <p className="text-lg font-semibold mb-3">Latest Appointments</p>

          {dashboardData.latestAppointments.length === 0 ? (
            <p className="text-center text-rose-400">
              No appointments booked yet.
            </p>
          ) : (
            <div className="divide-y divide-gray-200">
              {dashboardData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg"
                >
                  {/* Doctor's Image */}
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-12 h-12 rounded-full object-cover bg-gray-300"
                  />

                  {/* Doctor Info */}
                  <div className="flex-1 ml-4">
                    <p className="font-medium text-gray-900">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p className="text-gray-500 text-xs">{item.slotTime}</p>
                  </div>

                  {/* Cancel Button */}
                  {item.cancelled ? (
                    <p className="text-rose-400 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 font-semibold">Completed</p>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="ml-auto"
                    >
                      <MdOutlineCancel className="text-2xl cursor-pointer text-rose-700 hover:text-rose-500 transition" />
                    </button>
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

export default Dashboard;
