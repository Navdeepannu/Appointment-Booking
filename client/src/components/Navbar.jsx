import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  //TODO:for mobile view const [showMenu, setShowMenu] = useState(false);

  // Logout Function
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-2 mb-5 border-b border-b-gray-400">
      <div className="flex items-center" onClick={() => navigate("/")}>
        <img
          className="w-15 cursor-pointer mr-2"
          src={assets.icon_brand}
          alt="BrandLogo"
        />
        <h3 className="font-semibold text-xl cursor-pointer text-gray-700 pt-2">
          CareHub
        </h3>
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-primary">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:text-primary">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:text-primary">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:text-primary">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-secondary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img
              className="w-10 rounded-full"
              src={userData.image}
              alt="profileImage"
            />
            <img className="w-3" src={assets.dropdown_icon} />
            <div className="hidden absolute top-0 right-0 text-base pt-12 font-medium z-20 text-gray-600 group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 hover:text-black">
                <p
                  onClick={() => {
                    navigate(`/my-profile`);
                  }}
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate(`/my-appointments`);
                  }}
                >
                  My Appointments
                </p>
                <p onClick={logout}>Log Out</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/create-account`)}
            className="bg-primary cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-sky-500"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
