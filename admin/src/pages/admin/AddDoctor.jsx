import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  // State variables
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  // Get context
  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.warning("Image not selected");
      }
      const formData = new FormData();
      formData.append("docImg", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Debugging: Log FormData entries
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setDegree("");
        setAbout("");
        setFees("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error Submitting form: ", error);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-5 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload Doctor Image</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div className="flex flex-col gap-4">
            <div>
              <p>Your Name:</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div>
              <p>Email:</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className="w-full border border-gray-300 px-3 py-2  rounded"
              />
            </div>

            <div>
              <p>Create Password:</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="w-full border border-gray-300 px-3 py-2  rounded"
              />
            </div>

            <div>
              <p>Doctors experience:</p>
              <select
                value={experience}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                onChange={(e) => setExperience(e.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option
                    key={i}
                    value={`${i + 1} year`}
                  >{`${i + 1} Year`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p>Fees:</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                type="text"
                placeholder="Fees"
                required
                className="w-full border border-gray-300 px-3 py-2  rounded"
              />
            </div>

            <div>
              <p>Speciality:</p>
              <select
                value={speciality}
                className="w-full border border-gray-300 px-3 py-2  rounded"
                onChange={(e) => setSpeciality(e.target.value)}
              >
                {[
                  "General Physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p>Education:</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                type="text"
                placeholder="Education"
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <div>
              <p>Address:</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                type="text"
                placeholder="Address 1"
                required
                className="w-full border border-gray-300 px-3 py-2  rounded"
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                type="text"
                placeholder="Address 2"
                required
                className="w-full border border-gray-300 px-3 py-2  rounded mt-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p>About:</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about doctor.."
            rows={5}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <button className="mt-6 bg-primary text-white px-4 py-2 cursor-pointer rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
