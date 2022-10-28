import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CreateSingle.scss"
export const CreateSingle = ({ closeFunc }) => {
  const [cancionData, setCancionData] = useState({
    nombre: "",
    file: "",
    explicit: false,
    duracion: 0,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="Single-form">
      <h1 className="header">
        Crea una cancion
        <span>
          <button onClick={() => closeFunc()}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
          <button className="save" onClick={handleSubmit}>
            <i className="bi bi-upload"></i>Create
          </button>
        </span>
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="input">
          <label>Nombre</label>
          <input type="text" />
        </div>
        <div className="input">
          <label>Duracion</label>
          <input type="number" />
        </div>
        <div className="input checkbox">
          <label>Explicit</label>
          <input type="checkbox" />
        </div>
        <div className="input">
          <label>Elige la Cancion</label>
          <input type="file" accept="audio/*" />
        </div>
      </form>
    </div>
  );
};
