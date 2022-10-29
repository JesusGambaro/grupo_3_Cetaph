import React from "react";
import { useState, useEffect } from "react";
import { CreateAlbumForm } from "../Formulario/CreateAlbumForm";
import "./AllProductsStyle.scss";
import axios from "axios";
export const AllProducts = () => {
  const [formActive, setFormActive] = useState(false);
  const [disks, setDisks] = useState([]);
  const [isCreating, setCreating] = useState(false);
  const [albumObject, setAlbumObject] = useState();
  useEffect(() => {getAlbums()}, []);
  const getAlbums = () => {
    axios
      .get("http://localhost:9000/api/v1/album")
      .then((res) => {
        setDisks(res.data);
      })
      .catch((err) => {});
  };
  return (
    <div className="AllProducts">
      {formActive ? (
        <CreateAlbumForm
          cancelFunc={() => {
            setFormActive(!formActive);
            setAlbumObject(null);
          }}
          albumObject={albumObject}
          isCreating={isCreating}
          getAlbums={getAlbums}
        />
      ) : (
        <>
          <div className="add-section">
            <h1>Products list</h1>
            <form
              className="searchOwn"
              onClick={() => {
                //dispatch(resetState());
                //dispatch(resetFilters());
              }}
            >
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                placeholder="SEARCH"
                //value={searchParam}
                //onChange={(e) => setSearchParam(e.target.value)}
              />
            </form>
            <button
              className="create-button"
              onClick={() => {
                setFormActive(!formActive);
                setCreating(true);
              }}
            >
              {" "}
              Crear Nuevo Album
            </button>
          </div>
          <div className="album-container">
            {disks.map((param, i) => {
              return (
                <div className="album-card" key={i}>
                  <div className="img">
                    <img src={param.imagenes[0]?.urlImg} alt="" />
                  </div>
                  <span className="title">
                    <h1>{param.nombre}</h1>
                    <span className="subtitle">
                      <h3>Álbum</h3>
                      <div className="dot"></div>
                      <h3>{param.artistas[0]?.nombre}</h3>
                    </span>
                  </span>
                  <div className="actions">
                    <button
                      onClick={() => {
                        setFormActive(!formActive);
                        setAlbumObject(param);
                        setCreating(false);
                      }}
                    >
                      <i className="bi bi-pen"></i>Edit
                    </button>
                    <button onClick={() => {}}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
