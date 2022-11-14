import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./card.scss";
import axios from "axios";
const Card = ({ color, data }) => {
  const navigate = useNavigate();
  //console.log(data);
  const addCart = (idCart) => {
    axios
      .post(
        `http://localhost:9000/api/v1/cart/add?id=${idCart}&token=${localStorage.getItem("token")}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  
  return (
    <>
      <div
        className={"card" + (color === "white" ? " home" : "")}
        style={{ "--main-color": color }}
      >
        <div className="card-header">
          <Link to={"/Detail/" + data.id} className="noselect">
            <img
              src={
                data?.imagenes[0]
                  ? data?.imagenes[0].urlImg
                  : "https://www.biografiasyvidas.com/biografia/q/fotos/queen.jpg"
              }
              alt=""
              draggable="false"
            />
          </Link>
        </div>
        <div className="card-body">
          <h1 className="c-name">{data?.nombre}</h1>
          <h2 className="c-title">{data?.artistas[0]?.nombre}</h2>
        </div>
        <div className="card-footer">
          <div className="c-price-date">
            <p>{data?.fechaLanzamiento}</p>
            <p>${data?.precio || "$500"}</p>
          </div>
          <button
            className="add-to-cart"
            onClick={() => {
              console.log("hello");
              addCart(data?.id)
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </>
  );
};
export default Card;
