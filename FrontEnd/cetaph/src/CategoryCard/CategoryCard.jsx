import React from "react";
import "./CategoryCardStyle.scss";

const CategoryCard = ({img, data_category}) => {
  return (
    <div class="category-card-container">
      <div class="card-content-wrapper">
        <div class="cat-card-body cat-card-body--lhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <div class="cat-card-body cat-card-body--rhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <button>Ver Más</button>
      </div>
    </div>
  );
};
export default CategoryCard;
