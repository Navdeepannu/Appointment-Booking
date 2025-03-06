import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import { CiCircleInfo } from "react-icons/ci";
const Appointment = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);

  // get doctors id
  const { docId } = useParams();
  const doctors = useContext(AppContext);

  const fetchDoctor = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(docInfo);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDoctor();
    }
  }, [doctors, docId]);

  return (
    <div>
      {doctorInfo && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={doctorInfo.image}
              alt="doctorImage"
              className="w-full max-w-70 bg-blue-50 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 mx-2 ms:mx-0 mt-[-80px] sm:mt-0">
            <h1 className="font-bold text-2xl">{doctorInfo.name}</h1>
            <p className="text-sm text-gray-700 font-normal">
              {doctorInfo.degree} - {doctorInfo.speciality}{" "}
              <button className="border border-slate-400 shadow-sm text-neutral-800  rounded-full px-3 py-1 ml-1">
                {doctorInfo.experience}
              </button>
            </p>

            <p className="flex items-center gap-2">
              About:
              <CiCircleInfo className="text-blue-800 text-xl" />
            </p>
            <p className="text-gray-500 text-sm max-w-[700px] mt-1 font-light">
              {doctorInfo.about}
            </p>

            <p className="pt-4">
              <span className="text-gray-600 ">
                Appointment fee: ${doctorInfo.fees}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
