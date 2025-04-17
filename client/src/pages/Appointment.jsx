import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

import { toast, ToastContainer } from "react-toastify";
import { GoDash } from "react-icons/go";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();

  const navigateToAllDoctors = () => {
    navigate("/doctors");
  };
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]); // array to store doctors slots
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // get doctors id
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorData } = useContext(AppContext);

  // Days of week
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  // fetch doctor information to present the current doctor
  const fetchDoctor = useCallback(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDoctorInfo(docInfo);
  }, [doctors, docId]);

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDoctor();
    }
  }, [doctors, docId, fetchDoctor]);

  const getAvailableSlots = async () => {
    setDocSlots([]); // clear the slots
    let today = new Date(); // Get current data

    for (let i = 0; i < 10; i++) {
      let currentDate = new Date(today); // get current date
      currentDate.setDate(today.getDate() + i);

      // end time with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 9 ? currentDate.getHours() + 1 : 9
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(9);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        // format the date
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Update the slot after booked
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}-${month}-${year}`;
        const slotTime = formattedTime;

        // Check of the slot date is booked and in that date which time is booked
        const isSlotAvailable =
          doctorInfo.slots_booked?.[slotDate] &&
          doctorInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Update state once loop completes
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (doctorInfo) {
      getAvailableSlots();
    }
  }, [doctorInfo]);

  // for debugging
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      // console.log(slotDate);

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorData();

        // navigate to my appointments
        setTimeout(() => {
          getAvailableSlots();
          navigate("/my-appointments");
        }, 3000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {doctorInfo && doctorInfo !== undefined ? (
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
              <FaInfoCircle className="text-blue-700 text-md" />
            </p>
            <p className="text-gray-500 text-sm max-w-[700px] mt-1 font-light">
              {doctorInfo.about}
            </p>

            <p className="pt-4">
              <span className="text-gray-600 ">
                Appointment fee: ${doctorInfo.fees}
              </span>
            </p>

            <div className="flex items-center gap-2 text-sm text-center">
              <p
                className={`w-2 h-2 ${doctorInfo.available ? "bg-green-500" : "bg-red-600"} rounded-full`}
              ></p>
              <p
                className={`${doctorInfo.available ? "text-green-500" : "text-red-600"}`}
              >
                {doctorInfo.available ? "Available" : "Not Aailable"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center font-bold space-y-4">
          <p className="text-lg text-gray-700">
            It seems there is no doctor available under this ID. Would you like
            to explore all our doctors?
          </p>
          <button
            onClick={() => navigateToAllDoctors()} // Replace with navigation function
            className="bg-primary text-white px-8 py-3 rounded-full font-medium tracking-wide shadow-md hover:bg-primary-dark transition-all duration-300"
          >
            View All Doctors
          </button>
        </div>
      )}

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <div className="flex text-lg font-light items-center text-gray-600">
          Today : {new Date().toDateString()} <GoDash className="mx-2" />
          {new Date().toLocaleTimeString()}
        </div>
        <h1 className="text-xl p-2 text-gray-900">Book Slot</h1>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 transition-all duration-300 rounded-xl cursor-pointer ${slotIndex === index ? "bg-primary text-white scale-100" : "border border-gray-200 hover:bg-gray-100"} `}
              >
                <p className="mb-2 text-lg font-normal uppercase leading-none tracking-wider">
                  {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-lg leading-none font-normal">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
        </div>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "border border-gray-200 hover:bg-gray-100"} transition-all duration-300`}
                onClick={() => setSlotTime(item.time)}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="text-light text-sm border border-gray-200 shadow-sm rounded-full px-14 py-3 bg-primary mt-4 text-white cursor-pointer"
        >
          Book appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
