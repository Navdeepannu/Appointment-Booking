import React from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const logout = () => {
    aToken && setAToken("");
    dToken && setDToken("");

    aToken && localStorage.removeItem("aToken");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex items-center justify-between text-sm px-4 py-2  border-b border-b-gray-300">
      <div className="flex items-center">
        <img
          className="w-15 cursor-pointer"
          src={assets.logo}
          alt="BrandLogo"
        />
        <div className="flex flex-column items-center gap-1 ">
          <h3 className="font-semibold text-xl cursor-pointer text-gray-700 pt-2">
            CareHub
          </h3>
          <span className="font-light border border-gray-400 rounded-full px-2 text-sm">
            {aToken ? "Admin" : "Doctor"}
          </span>
        </div>
      </div>
      <button
        onClick={logout}
        className="mr-2 cursor-pointer text-white rounded-full px-10 py-2 bg-primary"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
