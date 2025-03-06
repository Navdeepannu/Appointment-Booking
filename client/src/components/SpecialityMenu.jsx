import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 text-gray-800 py-16"
    >
      <h1 className="font-medium text-3xl">Find by Speciality</h1>
      <p className="w:1/3 text-center text-sm">
        Simply brouse through our extensive list of doctors, Schedule your
        appointments.
      </p>

      <div className="flex flex-row sm:justify-center gap-4 pt-5 overflow-scroll w-full">
        {/*  */}
        {specialityData.map((item, index) => (
          <Link
            // Scroll To top and redirect to speciality doctor page to book appointment
            onClick={() => {
              scrollTo(0, 0);
            }}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col text-xs items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] duration-300 transition-all "
          >
            <img
              src={item.image}
              className="w-18 sm:w-24 mb-2"
              alt="SpecialityImage"
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
