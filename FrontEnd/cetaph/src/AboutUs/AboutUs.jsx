import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default AboutUs;