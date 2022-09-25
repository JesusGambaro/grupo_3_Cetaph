import React from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import "./card.scss";

const Card = ({color, data}) => {
  const navigate = useNavigate();
  return (
    <div
      className={"card" + (color === "white" ? " home" : "")}
      style={{"--main-color": color}}
    >
      <div className="card-header">
        <Link to={"/Detail/" + data.id} className="noselect">
          <img src={data?.image} alt="" draggable="false" />
        </Link>
      </div>
      <div className="card-body">
        <h1 className="c-name">{data?.name}</h1>
        <h2 className="c-title">{data?.artists[0].name}</h2>
      </div>
      <div className="card-footer">
        <div className="c-price-date">
          <p>{data?.release_date}</p>
          <p>{data?.price || "$500"}</p>
        </div>
        <button className="add-to-cart">Añadir al Carrito</button>
      </div>
    </div>
  );
};
export default Card;
