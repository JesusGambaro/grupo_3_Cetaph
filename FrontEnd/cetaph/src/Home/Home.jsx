import React from "react";
import {useNavigate} from "react-router";
import NavBar from "../Navbar/NavBar";
import DiscCard from "../DiscCard/DiscCard";
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
      <div className="home-container">
        <div className="home-container__categories">
          <div className="categories-header">
            <h1>Categories</h1>
            <form>
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i class="bi bi-search"></i>
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
                "https://lh3.googleusercontent.com/NzpxsXd1zYI-wjKRtdOlS3XCJK7mslbm2UFiU83vg4Vq_S-gQAF5otMl94-HzVmLuovwXdGzBeB29Uw=w544-h544-l90-rj"
              }
            />
            <CategoryCard
              img={
                "https://lh3.googleusercontent.com/wVwe0_TyzTUL8y4ihcVtPWS8-lVVV7WfzmNzir_Qy9jiccgvXJSGCI0_GKDlvxBPSHvyOGX_rHEm5g7Pfg=w544-h544-l90-rj"
              }
            />
            <CategoryCard
              img={
                "https://lh3.googleusercontent.com/weYQWfEwWNPOuAm34geXN1LkSYPlsJay78NnQgHC3PKsyZcdvBHIsMtqoFh3rioA4XgMdHMQd3h6vH6mbA=w544-h544-l90-rj"
              }
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
