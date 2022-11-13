import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CreateSingle.scss";

export const CreateSingle = ({ closeFunc, addSingleFunc }) => {
  const [cancionData, setCancionData] = useState({
    nombre: null,
    file: null,
    explicit: false,
    duracion: 0,
  });
  const [errors, setErrors] = useState({});
  const validateErrors = (property,value) => {
    let errores = {};
    if (property) {
      if (!value || value == "") {
        errores = { ...errores, [property]: "Este campo es obligatorio" };
      } else if ((typeof value === "number") && value < 60000) {
        errores = { ...errores, [property]: "La duracion debe ser superior a 1 minuto" };
      }
    } else {
      let keys = Object.keys(cancionData);
      keys.map((k) => {
        if (!cancionData[k] || cancionData[k] == "") {
          errores = { ...errores, [k]: "Este campo es obligatorio" };
        } else if ((typeof cancionData[k] === "number") && cancionData[k] < 60000) {
          errores = { ...errores, [k]: "La duracion debe ser superior a 1 minuto" };
        }
      });
    }
    setErrors(errores);
  };
  const [duracion, setDuracion] = useState({ min: 0, sec: 0 });
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
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
  document.onkeydown = function (e) {
    //console.log(e.key);
    if (e.key == "Enter") {
      console.log("submit");
      handleSubmit();
      closeFunc();
    } else if (e.key == "Escape") {
      closeFunc();
    }
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
          <button className="save" onClick={(e) => {
            handleSubmit(e)
            e.preventDefault();
          }}>
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </span>
      </h1>
      <div className="form-singles">
        {" "}
        <div className="input">
          <label>
            Nombre <div className="error">{errors.nombre}</div>
          </label>
          <input
            onChange={(e) => {
              setCancionData({ ...cancionData, nombre: e.target.value });
            }}
            type="text"
            maxLength={35}
          />
        </div>
        <div className="input">
          <label>Minutos</label>
          <input
            type="number"
            onChange={(e) => {
              setDuracion({ ...duracion, min: e.target.value.slice(0, 1) });
            }}
            value={duracion.min}
            max={9}
          />
        </div>
        <div className="input">
          <label>Segundos</label>
          <input
            type="number"
            onChange={(e) => {
              setDuracion({ ...duracion, sec: e.target.value.slice(0, 2) });
            }}
            value={duracion.sec}
            max={60}
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
        <div className="input file">
          <label>Cancion</label>
          {cancionData.file ? (
            <div className="music">
              <p>{cancionData.file.name}</p>
              <button
                onClick={() => {
                  setCancionData({
                    ...cancionData,
                    file: null,
                  });
                }}
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            </div>
          ) : (
            <label className="file">
              <input
                type="file"
                onChange={(e) => {
                  if (!cancionData.file) {
                    setCancionData({
                      ...cancionData,
                      file: e.target.files[0],
                    });
                  }
                }}
                accept=".mp3,audio/*"
              />
              <i className="bi bi-upload"></i>
              <p>Select a song</p>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
