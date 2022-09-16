import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
import DiscCard from "../DiscCard/DiscCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./home.scss";
import Footer from "../Footer/Footer";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="home-container">
        <DiscCard />
        <CategoryCard />
      </div>
      <Footer />
    </>
  );
};

export default Home;
