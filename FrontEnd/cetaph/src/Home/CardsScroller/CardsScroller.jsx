import React from "react";
import {useEffect} from "react";
import Card from "../../Card/Card";
import "./cards-scroller.scss";
const CardsScroller = ({props}) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 250;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft * -250;
  };

  //Scroll with mouse wheel
  useEffect(() => {
    /*    let slider = document.getElementById("slider");
    slider.addEventListener(
      "mousewheel",
      (e) => {
        if (!e.deltaY) return;
        let scrollDirection = e.deltaY > 0 ? 1 : -1;
        slider.scrollLeft += 30 * scrollDirection;
        let scrollLeft = Math.round(slider.scrollLeft);
        let maxScrollLeft = Math.round(slider.scrollWidth - slider.clientWidth);
        if (
          (scrollDirection === -1 && scrollLeft > 0) ||
          (scrollDirection === 1 && scrollLeft < maxScrollLeft)
        )
          e.preventDefault();
        return true;
      },
      false
    );*/
    const scrollContainer = document.querySelector("#slider");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
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
              <Card />
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
