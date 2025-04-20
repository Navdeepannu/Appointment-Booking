import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { FaRegAddressCard } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r border-gray-300">
      {aToken && (
        <ul className="text-[#151515] mt-5">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <RiDashboardHorizontalLine className="" />
              <span className="">Dashboard</span>
            </p>
          </NavLink>

          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <SlCalender className="" />
              <span className="">All Appointments</span>
            </p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <FaRegAddressCard className="" />
              <span className="">Add Doctors</span>
            </p>
          </NavLink>

          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <FaUserDoctor className="" />
              <span className="">Doctors List</span>
            </p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#151515] mt-5">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <RiDashboardHorizontalLine className="" />
              <span className="">Dashboard</span>
            </p>
          </NavLink>
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <FaUserDoctor className="" />
              <span className="">Doctors Profile</span>
            </p>
          </NavLink>
          <NavLink
            to={"/appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "text-primary border-r-4 bg-[#f3f6fb]" : ""}`
            }
          >
            <p className="flex flex-row gap-1 items-center">
              <SlCalender className="" />
              <span className="">All Appointments</span>
            </p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
