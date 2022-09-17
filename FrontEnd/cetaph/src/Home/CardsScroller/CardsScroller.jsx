import React from "react";
import {useEffect} from "react";
import DiscCard from "../../DiscCard/DiscCard";
import "./cards-scroller.scss";
const CardsScroller = ({props}) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  useEffect(() => {
    const scrollContainer = document.querySelector("#slider");
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      console.log();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }, []);

  return (
    <div id="main-slider-container">
      <i className="bi bi-arrow-left slider-icon left" onClick={slideRight}></i>
      <div id="slider">
        {props.map((slide, index) => {
          return (
            <div className="slider-card" key={index}>
              <DiscCard />
            </div>
          );
        })}
      </div>
      <i
        className="bi bi-arrow-right slider-icon right"
        onClick={slideLeft}
      ></i>
    </div>
  );
};

export default CardsScroller;
