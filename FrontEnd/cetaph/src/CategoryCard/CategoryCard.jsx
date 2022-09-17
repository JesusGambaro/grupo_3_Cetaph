import React from "react";
import "./CategoryCardStyle.scss";

const CategoryCard = ({img}) => {
  return (
    <div className="CategoryCard">
      <img
        src={img}
        alt=""
      />
      <button> Ver Mas </button>
    </div>
  );
};
export default CategoryCard;
