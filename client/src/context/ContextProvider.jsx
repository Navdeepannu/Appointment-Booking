import PropTypes from "prop-types";
import { AppContext } from "./Context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Context Provider
const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  ); // fetch token from localstorage to keep the user logged in

  // User Data
  const [userData, setUserData] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
        // console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // get doctors data
  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        toast.success(data.message);
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const value = {
    doctors,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorData,
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false); // clear user data when no token (at logout)
    }
  }, [token]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
