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
        <h1 className="cancionName">Sharks</h1>
        <h1 className="cancionArtist">Imagine Dragons</h1>
        <div className="FechaPrecio">
          <h1>12/2/2</h1>
          <h1>$500</h1>
        </div>{" "}
      </div>
        <button> Añadir al Carrito</button>
    </div>
  );
};
export default DiscCard;

