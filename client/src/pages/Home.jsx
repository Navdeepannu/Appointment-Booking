import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

import { useRef } from "react";

const Home = () => {
  const specialityMenuRef = useRef();

  const scrollToSpecialityMenu = () => {
    if (specialityMenuRef.current) {
      specialityMenuRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Header scrollToSpecialityMenu={scrollToSpecialityMenu} />
      <SpecialityMenu ref={specialityMenuRef} />
      <TopDoctors />
    </div>
  );
};

export default Home;
