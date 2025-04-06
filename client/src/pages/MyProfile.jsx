import { useContext, useState } from "react";
import { AppContext } from "../context/Context";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ProfilePage = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext); // get data from context

  const [image, setImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();

        setIsEdit(false);
        setImage(false);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error Updating profile: ", error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 p-4 text-sm">
        <ToastContainer />
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block cursor-pointer relative">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userData.image
                }
                alt="upload area"
                className="w-36 rounded-md cursor-pointer opacity-90"
              />
              <span>
                {!image && (
                  <IoCloudUploadOutline className="text-gray-700 text-5xl absolute bottom-12 right-12 " />
                )}
              </span>
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="UserProfile"
            className="w-36 rounded-md"
          />
        )}

        {isEdit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4 border rounded-md px-2 py-1"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter name"
            required
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-700 uppercase underline mt-3">
            Contact Information
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700 mt-3">
            {/* Email */}
            <p className="font-medium">Email: </p>
            <p className="text-blue-500 ">{userData.email}</p>

            {/* Phone */}
            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
                type="text"
                placeholder="Enter phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
                className="bg-gray-100 max-w-52"
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            {/* Address */}
            <p className="font-medium">Address: </p>
            {isEdit ? (
              <p>
                <input
                  type="text"
                  placeholder="Enter line1"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  required
                  className="bg-gray-50"
                />
                <br />
                <input
                  type="text"
                  placeholder="Enter line2"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="bg-gray-50"
                  required
                />
              </p>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-700 uppercase underline mt-3">
            GENERAL INFORMATION
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p>Gender: </p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="bg-gray-100 max-w-20"
              >
                <option value="male">Male</option>
                <option value="female"> Female</option>
              </select>
            ) : (
              <p className="text-gray-900">{userData.gender}</p>
            )}

            <p>Date of birth: </p>
            {isEdit ? (
              <input 
                type="date" 
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                required 
                className="max-w-30 bg-gray-100" 
              />
            ) : (
              <p className="text-gray-900 ">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="flex justify-start mt-4">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="cursor-pointer rounded-full border bg-white text-primary px-5 py-2 font-medium transition-all hover:bg-primary hover:text-white"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="cursor-pointer rounded-full border bg-white text-primary px-5 py-2 font-medium transition-all hover:bg-primary hover:text-white"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default ProfilePage;
