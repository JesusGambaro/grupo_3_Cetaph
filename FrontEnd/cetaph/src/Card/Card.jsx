import React from "react";
import "./card.scss";

const DiscCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <img
          src="https://lh3.googleusercontent.com/oWyLklmIlgBVjLy63kmFrXfgmzK8EIwpzyXneeLu3Ly6eqB_Usf7zZhZzo-LlwbxMx4WugYNW1Lp-ec=w544-h544-l90-rj"
          alt=""
          draggable="false"
        />
      </div>
      <div className="card-body">
        <h1 className="c-name">Mockingbird</h1>
        <h2 className="c-title">Eminem
 </h2>
      </div>
      <div className="card-footer">
        <div className="c-price-date">
          <p>12/2/2</p>
          <p>$500</p>
        </div>
        <button className="add-to-cart">Añadir al Carrito</button>
      </div>
    </div>
  );
};
export default DiscCard;
