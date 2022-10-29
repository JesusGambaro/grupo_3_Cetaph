import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CreateSingle.scss";
export const CreateSingle = ({ closeFunc, addSingleFunc }) => {
  const [cancionData, setCancionData] = useState({
    nombre: "",
    file: "",
    explicit: false,
    duracion: 0,
  });
  const [duracion, setDuracion] = useState({ min: 0, sec: 0 });
  const handleSubmit = (e) => {
    e.preventDefault();
    addSingleFunc({
      ...cancionData,
      duracion: duracion.min * 60000 + duracion.sec * 1000,
    });
    closeFunc();
  };
  const resetData = () => {
    setCancionData({
      nombre: "",
      file: "",
      explicit: false,
      duracion: 0,
    });
  };
  return (
    <div className="Single-form">
      <h1 className="header">
        Crea una cancion
        <span>
          <button
            onClick={() => {
              closeFunc();
              resetData();
            }}
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
          <button className="save" onClick={handleSubmit}>
            <i className="bi bi-upload"></i>Create
          </button>
        </span>
      </h1>
      <div className="form-singles">
        {" "}
        <div className="input">
          <label>Nombre</label>
          <input
            onChange={(e) => {
              setCancionData({ ...cancionData, nombre: e.target.value });
            }}
            type="text"
          />
        </div>
        <div className="input">
          <label>Minutos</label>
          <input
            type="number"
            onChange={(e) => {
              setDuracion({ ...duracion, min: e.target.value });
            }}
          />
        </div>
        <div className="input">
          <label>Segundos</label>
          <input
            type="number"
            onChange={(e) => {
              setDuracion({ ...duracion, sec: e.target.value });
            }}
          />
        </div>
        <div className="input checkbox">
          <label>Explicit</label>
          <input
            type="checkbox"
            onChange={() => {
              setCancionData({
                ...cancionData,
                explicit: !cancionData.explicit,
              });
            }}
          />
        </div>
        <div className="input">
          <label>Elige la Cancion</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              setCancionData({
                ...cancionData,
                file: e.target.files[0],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
