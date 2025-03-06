import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

import { useRef } from "react";

const Home = () => {
  const specialityRef = useRef(null);

  const scrollToSpcialityMenu = () => {
    console.log("Button Clicked!");
    specialityRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    console.log(specialityRef.current.scrollIntoView);
  };

  return (
    <div>
      <Header scrollToSpcialityMenu={scrollToSpcialityMenu} />
      <SpecialityMenu ref={specialityRef} />
      <TopDoctors />
    </div>
  );
};

export default Home;
