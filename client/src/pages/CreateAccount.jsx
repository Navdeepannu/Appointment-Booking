import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Name: ${name} \n Email: ${email} \n Password: ${password}`);
    console.log("Form Submitting...");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-[80vh]"
    >
      <div className="flex flex-col gap-3 m-auto items-center justify-center p-6 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-200 text-[#5E5E5E] text-sm shadow-2xl">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <p className="font-light text-sm text-center">
          Please sign up to book an appointment
        </p>

        <div className="w-full flex flex-col items-center">
          <label className="w-full text-left">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1 mb-2"
          />

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
            Create Account
          </button>

          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                navigate("/login");
              }}
              className="text-blue-700 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;
