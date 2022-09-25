import React from "react";
import "./CategoryCardStyle.scss";

const CategoryCard = ({img, data_category}) => {
  return (
    <div className="category-card-container">
      <div className="card-content-wrapper">
        <div className="cat-card-body cat-card-body--lhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <div className="cat-card-body cat-card-body--rhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <button>Ver Más</button>
      </div>
    </div>
  );
};
export default CategoryCard;
