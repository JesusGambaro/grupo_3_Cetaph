import React from "react";
import "./DiscCardStyle.scss";

const DiscCard = () => {
  return (
    <div className="DiscCard">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg"
        alt=""
      />
      <div className="TextInfo">
        <h1>Titulo Cancion</h1>
        <h1>Artista</h1>
        <div className="FechaPrecio">
          <h1>FECHA</h1>
          <h1>PRECIO</h1>
        </div>{" "}
        <button> Añadir al Carrito</button>
      </div>
    </div>
  );
};
export default DiscCard;

