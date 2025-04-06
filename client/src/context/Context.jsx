import { createContext } from "react";
import { doctors } from "../assets/assets";

// Create Context
export const AppContext = createContext(doctors, {
  token: "",
  setToken: "",
  backendUrl: "",
});
