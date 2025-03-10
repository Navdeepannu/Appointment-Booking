import PropTypes from "prop-types";
import { doctors } from "../assets/assets";
import { AppContext } from "./Context";

// Context Provider
const AppContextProvider = ({ children }) => {
  const value = {
    doctors,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  // Validate doctors array
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      speciality: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppContextProvider;
