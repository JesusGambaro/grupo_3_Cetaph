import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
import DiscCard from "../DiscCard/DiscCard";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <DiscCard />
    </div>
  );
};

export default Home;
