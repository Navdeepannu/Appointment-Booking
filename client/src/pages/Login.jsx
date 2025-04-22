import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/Context";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        password,
        email,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form Submitting... login");

    setEmail("");
    setPassword("");
  };

  // navigate to home page after login
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        toast.success("Login Successful");
        navigate("/my-profile");
      }, 500);
    }
  }, [token]);

  return (
    <>
      <ToastContainer />

      <form
        onSubmit={handleLoginSubmit}
        className="flex justify-center items-center min-h-[80vh]"
      >
        <div className="flex flex-col gap-3 m-auto items-center justify-center p-6 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-200 text-[#5E5E5E] text-sm shadow-2xl">
          <h2 className="text-2xl font-semibold">Login</h2>
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

            <p>
              Create an new account?{" "}
              <span
                onClick={() => {
                  navigate("/create-account");
                }}
                className="text-blue-700 cursor-pointer underline"
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
