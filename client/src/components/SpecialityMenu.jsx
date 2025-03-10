import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

const SpecialityMenu = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 text-gray-800 py-16"
    >
      <h1 className="font-medium text-3xl">Find by Speciality</h1>
      <p className="w-1/3 text-center text-sm">
        Simply browse through our extensive list of doctors, schedule your
        appointments.
      </p>

      <div className="flex flex-row sm:justify-center gap-4 pt-5 overflow-x-auto w-full">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col text-xs items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] duration-300 transition-all"
          >
            <img
              src={item.image}
              className="w-18 sm:w-24 mb-2"
              alt={`${item.speciality} Icon`}
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
});

// Set display name for better debugging
SpecialityMenu.displayName = "SpecialityMenu";

export default SpecialityMenu;
