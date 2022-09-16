import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
import DiscCard from "../DiscCard/DiscCard";
import CategoryCard from "../CategoryCard/CategoryCard";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <DiscCard />
      <CategoryCard />
    </div>
  );
};

export default Home;
