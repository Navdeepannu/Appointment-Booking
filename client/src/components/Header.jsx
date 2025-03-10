import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa6";

const Header = ({ scrollToSpecialityMenu }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 text-white">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px] m-auto ">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold sm:leading-tight">
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
          <img src={assets.group_profiles} alt="group_profiles" />
          <p>
            Schedule your consultation with experienced healthcare professionals
            at your convenience.
          </p>
        </div>

        {/* scroll page to speciality menu */}
        <button
          onClick={scrollToSpecialityMenu}
          className="flex cursor-pointer items-center gap-2 bg-white rounded-full px-8 py-3 text-gray-600 text-sm md:m-0 m-auto hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <FaArrowRight />
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="header_img"
        /> 
      </div>
    </div>
  );
};

export default Header;
