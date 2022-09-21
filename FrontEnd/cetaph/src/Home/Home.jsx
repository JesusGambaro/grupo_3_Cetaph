import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
import Card from "../Card/Card";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./home.scss";
import CardsScroller from "./CardsScroller/CardsScroller";
import Footer from "../Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const discos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <NavBar />
      <div className="home-container-own">
        <div className="home-container__categories">
          <div className="categories-header">
            <h1>Categories</h1>
            <form>
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              laboriosam quasi? Aliquam id delectus dolores, doloremque
              dignissimos soluta laboriosam ullam sed amet quia perferendis a
              quo, cupiditate possimus iste veritatis!
            </p>
          </div>
          <div className="categories-card-wrapper">
            <CategoryCard
              img={
                "https://hotpotmedia.s3.us-east-2.amazonaws.com/8-2nrTeBEkbdoRZPs.png"
              }
              data_category={"Jazz"}
            />
            <CategoryCard
              img={
                "https://mj-gallery.com/0e6da7ba-8d90-4ba2-8706-5db9b4177d7a/grid_0.png"
              }
              data_category={"Summer Hits"}
            />
            <CategoryCard
              img={
                "https://hotpotmedia.s3.us-east-2.amazonaws.com/8-sj4CVUBWisqrnZJ.png"
              }
              data_category={"Classical"}
            />
          </div>
        </div>
        <div className="home-container__discs">
          <div className="discs-header">
            <h1>Discs</h1>
          </div>
          <CardsScroller props={discos} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
