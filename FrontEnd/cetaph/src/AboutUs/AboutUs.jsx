import React from "react";
import {useNavigate} from "react-router";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      AboutUs <button onClick={() => navigate("/Home")}>Click</button>
    </div>
  );
};

export default AboutUs;
