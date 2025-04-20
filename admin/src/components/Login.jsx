import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        // clear doctor token (dToken)
        localStorage.removeItem("dToken");
        setDToken("");

        // login the admin
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);

          setTimeout(() => {
            toast.success("Login successful");
          }, 100);

          navigate("/admin-dashboard");
        } else {
          toast.error(data.message); // error message
        }
      } else {
        // Clear admin token if switching to Doctor
        localStorage.removeItem("aToken");
        setAToken(null);

        // Login the doctor
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/doctor-dashboard");

          setTimeout(() => {
            toast.success("Login Successful.");
          }, 100);
          
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className="flex justify-center items-center min-h-[80vh]"
    >
      <ToastContainer />
      <div className="flex flex-col gap-3 m-auto items-center justify-center p-6 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-200 text-[#5E5E5E] text-sm shadow-2xl">
        <h2 className="text-2xl font-semibold">
          <span className="text-primary">{state}</span> Login
        </h2>
        <p className="font-light text-sm text-center">
          Please log in to book an appointment
        </p>

        <div className="w-full flex flex-col items-center">
          <label className="w-full text-left">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1 mb-2"
          />

          <label className="w-full text-left">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1 mb-2"
          />

          <button
            type="submit"
            className="bg-primary text-white w-full py-2 my-2 rounded-md text-base cursor-pointer"
          >
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="cursor-pointer underline text-primary"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="cursor-pointer underline text-primary"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
