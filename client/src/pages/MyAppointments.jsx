import { useContext } from "react";
import { AppContext } from "../context/Context";

const MyAppointments = () => {
  const doctors = useContext(AppContext);

  return (
    <div>
      <div className="mt-6">
        {doctors &&
          doctors.slice(0, 2).map((doctor, index) => (
            <div
              key={index}
              className="flex justify-between items-start gap-8 md:flex-row sm:flex-col transition-all duration-300 rounded-md border border-gray-200 shadow-xl p-4 mt-4"
            >
              <div className="flex md:flex-row gap-6">
                <img
                  src={doctor.image}
                  alt="doctor_image"
                  className="w-40 rounded-md bg-blue-50"
                />
                <div>
                  <p className="text-2xl text-gray-800 font-normal">
                    {doctor.name}
                  </p>
                  <p className="text-md text-gray-700">{doctor.speciality}</p>

                  <p className="text-sm text-neutral-500 font-light mt-2">
                    {doctor.address.line1}
                  </p>
                  <p className="text-sm text-neutral-500 font-light">
                    {doctor.address.line2}
                  </p>
                  <p className="text-sm text-neutral-500 font-light mt-2">
                    <span className="text-black text-sm">Date & Time: </span>10
                    March, 2025 | 9:30 AM
                  </p>
                </div>
              </div>
              <div className="cursor-pointer border text-rose-700 p-2 rounded-md hover:bg-rose-700 hover:text-white duration-400 transition-all">
                <button className="tracking-wide cursor-pointer font-light">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
