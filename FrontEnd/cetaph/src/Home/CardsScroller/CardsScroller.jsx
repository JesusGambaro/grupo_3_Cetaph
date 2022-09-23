import React from "react";
import { useEffect } from "react";
import Card from "../../Card/Card";
import "./cards-scroller.scss";
import ScrollContainer from "react-indiana-drag-scroll";

const CardsScroller = ({ props }) => {
  const slideLeft = () => {
    /* var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 250; */
  };

  const slideRight = () => {
    /*   var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft * -250; */
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
    //Scroll with mouse wheel
    /*  const scrollContainer = document.querySelector("#slider");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    }); */
  }, []);

  let pos = { top: 0, x: 0 };
  const mouseDownHandler = (e) => {
    const ele = document.getElementById("slider");
    pos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };
  const mouseMoveHandler = (e) => {
    const ele = document.getElementById("slider");
    ele.scrollLeft = pos.left - (e.clientX - pos.x);
  };
  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div
      id="main-slider-container"
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      <i className="bi bi-arrow-left slider-icon left" onClick={slideRight}></i>
      <div id="slider">
        <ScrollContainer className="scroll-container">
          {props.map((slide, index) => {
            return (
              <div className="slider-card noselect" key={index}>
                <Card />
              </div>
            );
          })}
        </ScrollContainer>
      </div>
      <i
        className="bi bi-arrow-right slider-icon right"
        onClick={slideLeft}
      ></i>
    </div>
  );
};

export default CardsScroller;
